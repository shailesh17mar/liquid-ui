import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import { API } from "aws-amplify";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { generateJSON, JSONContent, NodeViewProps } from "@tiptap/react";
import {
  DeleteButton,
  TranscriptionButton,
  VideoContainer,
  VideoPlayer,
  VideoPlayerSkeleton,
  VideoPlayerWrapper,
} from "./video.styles";
import {
  EuiConfirmModal,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
  EuiPanel,
  EuiText,
} from "@elastic/eui";
import { useParams } from "react-router-dom";
import TimeOffset from "../time-offset";
import { CustomParagraph } from "../../editor";
import { useAssetUpload } from "../../../../hooks/use-asset-upload";
import {
  useUpdateVideoAsset,
  useVideoAsset,
} from "core/modules/videoAssets/hooks";
import { useCreateTranscription } from "core/modules/transcripts/hooks";
import { TranscriptionStatus } from "models";
import _ from "lodash";
import { displayTranscript } from "../transcript/transcript-parser";
import ReactPlayer from "react-player";

export const Video = (props: NodeViewProps) => {
  const { id } = useParams() as { id: string };
  const uploaderRef = useRef<HTMLInputElement>(null);
  const { video, transcriptId } = props.node.attrs;
  const [contentType, setContentType] = useState<string>();
  const [containsTranscript, setContainsTranscript] = useState(false);

  const [isTranscriptionOwner, setIsTranscriptionOwner, remove] =
    useLocalStorage(`doc-${id}`, false);

  const [isDestroyModalVisible, setIsDestroyModalVisible] = useState(false);
  const [videoURL, setVideoURL] = useState<string>();
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const { data: videoAsset } = useVideoAsset(
    video || "",
    Boolean(video),
    isTranscribing
  );

  useEffect(() => {
    if (transcriptId) {
      const content = props.editor.getJSON();
      if (content.content) {
        const containsTranscript = content.content.some(
          (content) =>
            content.type === "transcriptComponent" &&
            content.attrs?.transcriptId === transcriptId
        );
        setContainsTranscript(containsTranscript);
      }
    }
  }, [props.editor, transcriptId]);

  const transcriptCreateMutation = useCreateTranscription();
  const videoAssetUpdateMutation = useUpdateVideoAsset();

  const handleVideoUploadSuccess = (videoAssetId: string) => {
    props.updateAttributes({
      video: videoAssetId,
    });
  };

  const { upload, progress } = useAssetUpload({
    onSuccess: handleVideoUploadSuccess,
    isVideoAsset: true,
  });

  const closeDestroyModal = () => setIsDestroyModalVisible(false);
  const showDestroyModal = () => setIsDestroyModalVisible(true);

  useEffect(() => {
    if (
      videoAsset?.transcription &&
      videoAsset?.transcription?.status !== TranscriptionStatus.COMPLETED &&
      !isTranscribing &&
      isTranscriptionOwner
    ) {
      setIsTranscribing(true);
    }
  }, [isTranscribing, isTranscriptionOwner, videoAsset?.transcription]);

  useEffect(() => {
    if (!video) {
      uploaderRef.current?.click();
    }
  }, [video]);

  useEffect(() => {
    async function fetchVideoUrl() {
      const { url, metadata } = await API.get(
        "assets",
        `/assets/${videoAsset?.video}`,
        {}
      );
      if (metadata.contenttype.includes("video")) setContentType("video");
      setVideoURL(url);
    }
    if (videoAsset?.video) {
      fetchVideoUrl();
    }
  }, [videoAsset?.video]);

  const insertTranscript = (id: string, transcriptJson: JSONContent[]) => {
    remove();
    props.updateAttributes({
      video,
      transcriptId: id,
    });
    props.editor.commands.focus("end");

    props.editor.commands.setTranscript({ transcriptId: id }, transcriptJson);
  };

  useEffect(() => {
    const fetchTranscriptJson = async (id: string) => {
      const key = `${id}.json`;
      const { url: transcriptJSONFile } = await API.get(
        "assets",
        `/assets/${key}`,
        {}
      );
      const transcriptResponse = await fetch(transcriptJSONFile);
      const transcriptJson = await transcriptResponse.json();
      const transcriptHTML = displayTranscript(transcriptJson);
      const transcriptDocument = generateJSON(transcriptHTML, [
        Document,
        CustomParagraph,
        TimeOffset,
        Text,
      ]);
      transcriptDocument.content = transcriptDocument.content.reduce(
        (acc: any[], para: any) => {
          if (para.content) {
            acc.push(para);
          } else {
            acc.pop();
          }
          return acc;
        },
        []
      );
      insertTranscript(id, transcriptDocument.content);
    };
    if (
      videoAsset?.transcription?.status === TranscriptionStatus.COMPLETED &&
      !containsTranscript &&
      isTranscriptionOwner
    ) {
      setIsTranscribing(false);
      fetchTranscriptJson(videoAsset.transcription.id);
    }
  }, [isTranscriptionOwner, transcriptId, videoAsset?.transcription]);

  const handleDeleteVideo = () => {
    props.deleteNode();
  };

  const handleTranscription = async () => {
    if (videoURL && videoAsset) {
      if (!videoAsset.transcription) {
        const transcript = await transcriptCreateMutation.mutateAsync({
          video: videoAsset.video,
          status: TranscriptionStatus.ENQUEUED,
        });

        await videoAssetUpdateMutation.mutateAsync({
          id: video,
          vodAssetTranscriptionId: transcript?.id,
        });
        setIsTranscriptionOwner(true);
      } else {
        props.updateAttributes({
          video,
        });
        setIsTranscriptionOwner(true);
      }
    } else throw new Error("No video to transcribe");
  };

  const handleFocus = useCallback(() => {
    setTimeout(() => {
      if (!isFileSelected && uploaderRef?.current) {
        if (uploaderRef?.current.files?.length === 0 && !video) {
          window.removeEventListener("focus", handleFocus);
          handleDeleteVideo();
        }
      }
    }, 500);
  }, [isFileSelected]);

  const handleFileTrigger = () => {
    window.addEventListener("focus", handleFocus);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    window.removeEventListener("focus", handleFocus);
    const file = e.target.files!![0];
    upload(file);
    setIsFileSelected(true);
  };

  return (
    <VideoContainer>
      <div className="content">
        <DeleteButton
          iconType="trash"
          size="s"
          fill
          color="danger"
          aria-label="Delete Video"
          onClick={showDestroyModal}
        >
          Remove video
        </DeleteButton>
        {isDestroyModalVisible && (
          <EuiConfirmModal
            title="Do you want to remove this video?"
            onCancel={closeDestroyModal}
            onConfirm={() => handleDeleteVideo()}
            cancelButtonText="No"
            confirmButtonText="Yes, Please"
            buttonColor="danger"
            defaultFocusedButton="confirm"
          >
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        )}
        <EuiFieldText
          controlOnly
          style={{ display: "none" }}
          type="file"
          inputRef={uploaderRef}
          accept="video/*,audio/*"
          onClick={handleFileTrigger}
          onChange={handleFileUpload}
        />

        {videoURL ? (
          <EuiPanel hasShadow={false}>
            <EuiFlexGroup direction="column" justifyContent="center">
              <EuiFlexItem grow={false}>
                {contentType === "video" ? (
                  <VideoPlayerWrapper>
                    <VideoPlayer
                      width="100%"
                      height="auto"
                      url={videoURL}
                      // config={{
                      //   file: {
                      //     hlsOptions: {
                      //       xhrSetup: function xhrSetup(xhr: any, url: string) {
                      //         xhr.setRequestHeader(
                      //           "Access-Control-Allow-Headers",
                      //           "Content-Type, Accept, X-Requested-With"
                      //         );
                      //         // xhr.setRequestHeader(
                      //         //   "Access-Control-Allow-Origin",
                      //         //   "http://localhost:3000"
                      //         // );
                      //         xhr.setRequestHeader(
                      //           "Access-Control-Allow-Credentials",
                      //           "true"
                      //         );
                      //         xhr.open("GET", url + token);
                      //       },
                      //     },
                      //   },
                      // }}
                      playbackRate={1.0}
                      controls
                      onError={(e: any) => console.log("onError", e)}
                    />
                  </VideoPlayerWrapper>
                ) : (
                  <ReactPlayer
                    height={50}
                    width="100%"
                    url={videoURL}
                    // config={{
                    //   file: {
                    //     hlsOptions: {
                    //       xhrSetup: function xhrSetup(xhr: any, url: string) {
                    //         xhr.setRequestHeader(
                    //           "Access-Control-Allow-Headers",
                    //           "Content-Type, Accept, X-Requested-With"
                    //         );
                    //         // xhr.setRequestHeader(
                    //         //   "Access-Control-Allow-Origin",
                    //         //   "http://localhost:3000"
                    //         // );
                    //         xhr.setRequestHeader(
                    //           "Access-Control-Allow-Credentials",
                    //           "true"
                    //         );
                    //         xhr.open("GET", url + token);
                    //       },
                    //     },
                    //   },
                    // }}
                    playbackRate={1.0}
                    controls
                    onError={(e: any) => console.log("onError", e)}
                  />
                )}
              </EuiFlexItem>
              {!containsTranscript && (
                <EuiFlexItem>
                  {isTranscribing ||
                  (videoAsset?.transcription &&
                    [
                      TranscriptionStatus.INPROGRESS,
                      TranscriptionStatus.ENQUEUED,
                    ].includes(
                      videoAsset.transcription.status as TranscriptionStatus
                    )) ? (
                    <TranscriptionButton fullWidth={false} disabled isLoading>
                      Transcribing...
                    </TranscriptionButton>
                  ) : !transcriptId ? (
                    <TranscriptionButton
                      fullWidth={false}
                      onClick={handleTranscription}
                    >
                      Start Transcribing
                    </TranscriptionButton>
                  ) : (
                    <TranscriptionButton
                      fullWidth={false}
                      disabled={isTranscribing}
                      onClick={handleTranscription}
                    >
                      {isTranscribing ? "Retrying" : "Retry"}
                    </TranscriptionButton>
                  )}
                </EuiFlexItem>
              )}
              {/* <EuiButton
              onClick={() => {
                // interactiveTranscript = new InteractiveTranscript();
              }}
            >
              XXX
            </EuiButton> */}
            </EuiFlexGroup>
          </EuiPanel>
        ) : (
          <>
            {video && <VideoPlayerSkeleton />}
            {isFileSelected && !video && progress > 0 && (
              <EuiPanel color="subdued">
                <EuiText color="subdued">
                  <EuiLoadingSpinner /> &nbsp;
                  {`Upload in progress... ${progress}%`}
                </EuiText>
              </EuiPanel>
            )}
          </>
        )}
      </div>
    </VideoContainer>
  );
};
