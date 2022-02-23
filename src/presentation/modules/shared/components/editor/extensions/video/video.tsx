import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import { API } from "aws-amplify";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { generateJSON, NodeViewProps } from "@tiptap/react";
import {
  DeleteButton,
  VideoContainer,
  VideoPlayer,
  VideoPlayerSkeleton,
} from "./video.styles";
import {
  EuiButton,
  EuiCard,
  EuiConfirmModal,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiLoadingSpinner,
  EuiPanel,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import ReactPlayer from "react-player";
import { VodAsset } from "models";
import { useParams } from "react-router-dom";
import TimeOffset from "../time-offset";
import { CustomParagraph } from "../../editor";
import { useRecoilState } from "recoil";
import { useVideoUpload } from "../../../transcript/hooks/use-video-upload";
import {
  useUpdateVideoAsset,
  useVideoAsset,
} from "core/modules/videoAssets/hooks";
import { useCreateTranscription } from "core/modules/transcripts/hooks";
import { TranscriptionStatus } from "models";
import { useStory } from "core/modules/stories/hooks";
import _ from "lodash";
import { initTranscript } from "../transcript/transcript";
import { displayTranscript } from "../transcript/transcript-parser";

export const Video = (props: NodeViewProps) => {
  const { id } = useParams() as { id: string };
  const [isTranscriptionOwner, setIsTranscriptionOwner, remove] =
    useLocalStorage(`doc-${id}`, true);
  const [isDestroyModalVisible, setIsDestroyModalVisible] = useState(false);
  const [isInitTranscript, setIsInitTranscript] =
    useRecoilState(initTranscript);
  const { video, id: transcriptId } = props.node.attrs;
  const uploaderRef = useRef<HTMLInputElement>(null);
  const [videoURL, setVideoURL] = useState<string | undefined>();
  const [isPolling, setIsPolling] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const [isFileSelected] = useState(false);

  const { data } = useVideoAsset(video || "", Boolean(video), isPolling);
  const { data: story } = useStory(id);
  const transcriptCreateMutation = useCreateTranscription();
  const videoAssetUpdateMutation = useUpdateVideoAsset();
  const videoAsset = data as VodAsset;

  console.log(videoAsset?.transcription?.status);
  const handleVideoUploadSuccess = (videoAssetId: string) => {
    props.updateAttributes({
      video: videoAssetId,
    });
  };
  const { upload, progress } = useVideoUpload({
    onSuccess: handleVideoUploadSuccess,
  });

  useEffect(() => {
    if (
      videoAsset?.transcription?.status !== TranscriptionStatus.COMPLETED &&
      !isPolling &&
      isTranscriptionOwner
    ) {
      setIsPolling(true);
    }
  }, [videoAsset?.transcription?.status]);

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

  const setupTranscriptJSON = async () => {
    const fetchTranscriptJson = async (id: string) => {
      const key = `${id}.json`;
      const { url: transcriptJSONFile } = await API.get(
        "assets",
        `/assets/${key}`,
        {}
      );
      //@ts-ignore
      const transcriptResponse = await fetch(transcriptJSONFile);
      const transcriptJson = await transcriptResponse.json();
      const transcriptHTML = displayTranscript(transcriptJson);
      return generateJSON(transcriptHTML, [
        Document,
        CustomParagraph,
        TimeOffset,
        Text,
      ]);
    };

    if (
      story &&
      videoAsset?.transcription &&
      videoAsset?.transcription?.status === TranscriptionStatus.COMPLETED &&
      !isInitTranscript &&
      !transcriptId
    ) {
      const transcriptJson = await fetchTranscriptJson(
        videoAsset?.transcription.id
      );
      props.editor.commands.setTranscript(
        { ...props.node.attrs, id: videoAsset?.transcription.id },
        transcriptJson.content
      );
      props.updateAttributes({
        ...props.node.attrs,
        id: videoAsset?.transcription.id,
      });
      setIsPolling(false);
      remove();
    }
  };

  // useEffect(() => {
  //   if (isInitTranscript) {
  //     setupTranscriptJSON();
  //   }
  // }, [isInitTranscript, setupTranscriptJSON]);

  useEffect(() => {
    if (
      !isInitTranscript &&
      videoAsset?.transcription &&
      isTranscriptionOwner
    ) {
      setIsInitTranscript(true);
      setupTranscriptJSON();
      // setIsPolling(true);
    }
  }, [isInitTranscript, setIsInitTranscript, videoAsset?.transcription]);

  useEffect(() => {
    const transcriptId = videoAsset?.transcription?.id;
    if (transcriptId) {
      //gethighlights
    }
  }, [videoAsset?.transcription?.id]);

  const closeDestroyModal = () => setIsDestroyModalVisible(false);
  const showDestroyModal = () => setIsDestroyModalVisible(true);
  const handleDeleteTranscript = useCallback(async () => {
    //remove
    props.deleteNode();
    // const doc = props.editor.getJSON();
    // const content = doc.content?.filter(
    //   (el) => el.type === "transcriptComponent" && el.attrs?.video !== video
    // );
    // if (content && content.length >= 0) {
    //   props.editor.commands.setContent({ ...doc, content }, true);
    // }
  }, [props.editor]);

  const handleTranscription = async () => {
    //TODO: Check that transcription entry for the video shouldn't exist before hand.
    if (videoURL) {
      if (!videoAsset?.transcription) {
        //create a transcription entry
        const transcript = await transcriptCreateMutation.mutateAsync({
          video: videoAsset?.video,
          status: TranscriptionStatus.ENQUEUED,
        });
        //update reference in transcription

        await videoAssetUpdateMutation.mutateAsync({
          id: video,
          vodAssetTranscriptionId: transcript?.id,
        });
        setIsPolling(true);
        setIsTranscriptionOwner(true);
        setIsTranscribing(true);
      }
      //update story
    } else throw new Error("No video to transcribe");
    // const doc = props.editor.getJSON();
    // const content = doc.content?.map((el) => {
    //   if (el.type === "transcriptComponent")
    //     return {
    //       ...el,
    //       content: data,
    //     };
    //   return el;
    // });

    // props.editor.commands.setContent({ ...doc, content });
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
