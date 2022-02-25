import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import { API } from "aws-amplify";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { generateJSON, JSONContent, NodeViewProps } from "@tiptap/react";
import {
  DeleteButton,
  VideoContainer,
  VideoPlayer,
  VideoPlayerSkeleton,
} from "./video.styles";
import {
  EuiButton,
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
import { useVideoUpload } from "../../../transcript/hooks/use-video-upload";
import {
  useUpdateVideoAsset,
  useVideoAsset,
} from "core/modules/videoAssets/hooks";
import { useCreateTranscription } from "core/modules/transcripts/hooks";
import { TranscriptionStatus } from "models";
import _ from "lodash";
import { displayTranscript } from "../transcript/transcript-parser";

export const Video = (props: NodeViewProps) => {
  const { id } = useParams() as { id: string };
  const { video, id: transcriptId } = props.node.attrs;

  const [isTranscriptionOwner, setIsTranscriptionOwner, remove] =
    useLocalStorage(`doc-${id}`, false);
  const uploaderRef = useRef<HTMLInputElement>(null);

  const [isDestroyModalVisible, setIsDestroyModalVisible] = useState(false);
  const [videoURL, setVideoURL] = useState<string>();
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFileSelected] = useState(false);

  const { data: videoAsset } = useVideoAsset(
    video || "",
    Boolean(video),
    isTranscribing
  );

  const transcriptCreateMutation = useCreateTranscription();
  const videoAssetUpdateMutation = useUpdateVideoAsset();

  console.log(videoAsset?.transcription?.status);
  const handleVideoUploadSuccess = (videoAssetId: string) => {
    props.updateAttributes({
      video: videoAssetId,
    });
  };
  const { upload, progress } = useVideoUpload({
    onSuccess: handleVideoUploadSuccess,
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
      const { url } = await API.get(
        "assets",
        `/assets/${videoAsset?.video}`,
        {}
      );
      setVideoURL(url);
    }
    if (videoAsset?.video) {
      fetchVideoUrl();
    }
  }, [videoAsset?.video]);

  const insertTranscript = useCallback(
    (id: string, transcriptJson: JSONContent[]) => {
      props.editor.commands.setTranscript(
        { ...props.node.attrs, id },
        transcriptJson
      );
      remove();
      props.updateAttributes({
        ...props.node.attrs,
        id,
      });
    },
    [props, remove]
  );

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
      insertTranscript(id, transcriptDocument.content);
    };
    if (
      videoAsset?.transcription?.status === TranscriptionStatus.COMPLETED &&
      !transcriptId &&
      isTranscriptionOwner
    ) {
      fetchTranscriptJson(videoAsset.transcription.id);
      debugger;
    }
  }, [
    insertTranscript,
    isTranscriptionOwner,
    transcriptId,
    videoAsset?.transcription,
  ]);

  const handleDeleteTranscript = useCallback(async () => {
    props.deleteNode();
  }, [props]);

  const handleTranscription = async () => {
    if (videoURL) {
      if (videoAsset && !videoAsset?.transcription) {
        //create a transcription entry
        const transcript = await transcriptCreateMutation.mutateAsync({
          video: videoAsset.video,
          status: TranscriptionStatus.ENQUEUED,
        });
        //update reference in transcription

        await videoAssetUpdateMutation.mutateAsync({
          id: video,
          vodAssetTranscriptionId: transcript?.id,
        });
        setIsTranscriptionOwner(true);
        setIsTranscribing(true);
      }
    } else throw new Error("No video to transcribe");
  };

  const handleFocus = useCallback(() => {
    setTimeout(() => {
      if (!isFileSelected && uploaderRef?.current) {
        if (uploaderRef?.current.files?.length === 0) {
          window.removeEventListener("focus", handleFocus);
          handleDeleteTranscript();
        }
      }
    }, 500);
  }, [handleDeleteTranscript, isFileSelected]);

  const handleFileTrigger = () => {
    window.addEventListener("focus", handleFocus);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    window.removeEventListener("focus", handleFocus);
    const file = e.target.files!![0];
    upload(file);
  };

  return (
    <VideoContainer>
      <DeleteButton
        iconType="trash"
        display="base"
        color="danger"
        aria-label="Delete Video"
        onClick={showDestroyModal}
      />
      {isDestroyModalVisible && (
        <EuiConfirmModal
          title="Do you want to remove this video?"
          onCancel={closeDestroyModal}
          onConfirm={handleDeleteTranscript}
          cancelButtonText="No"
          confirmButtonText="Yes, Please"
          buttonColor="danger"
          defaultFocusedButton="confirm"
        >
          <p>Are you sure you want to do this?</p>
        </EuiConfirmModal>
      )}
      <EuiFieldText
        style={{ display: "none" }}
        type="file"
        inputRef={uploaderRef}
        accept="video/*"
        onClick={handleFileTrigger}
        onChange={handleFileUpload}
      />

      {videoURL ? (
        <EuiPanel hasShadow={false}>
          <EuiFlexGroup direction="column" justifyContent="spaceAround">
            <EuiFlexItem grow={false}>
              <VideoPlayer
                width={768}
                height={428}
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
            </EuiFlexItem>
            <EuiFlexItem>
              {isTranscribing ||
              (videoAsset?.transcription &&
                [
                  TranscriptionStatus.INPROGRESS,
                  TranscriptionStatus.ENQUEUED,
                ].includes(
                  videoAsset.transcription.status as TranscriptionStatus
                )) ? (
                <EuiButton fullWidth={false} disabled isLoading>
                  Transcribing...
                </EuiButton>
              ) : (
                <EuiButton fullWidth={false} onClick={handleTranscription}>
                  Start Transcribing
                </EuiButton>
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      ) : (
        <>
          {video && <VideoPlayerSkeleton />}
          {progress > 0 && (
            <EuiPanel color="subdued">
              <EuiText color="subdued">
                <EuiLoadingSpinner /> &nbsp; Upload in progress... {progress}%
              </EuiText>
            </EuiPanel>
          )}
        </>
      )}
    </VideoContainer>
  );
};
