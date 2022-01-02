import { useEffect, useRef, useState } from "react";
import { API, Storage } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { NodeViewProps } from "@tiptap/react";
import { TranscriptContainer, TranscriptContent } from "./transcript.styles";
import { useHighlight } from "./hooks/use-highlight";
import {
  EuiButton,
  EuiFieldText,
  EuiLoadingSpinner,
  EuiPanel,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import ReactPlayer from "react-player";
import { TranscriptAssistant } from "./transcript-assistant";
import { data } from "./dummy";
import { nanoid } from "nanoid";
import awsvideoconfig from "aws-video-exports";
import { TranscriptionStatus, VodAsset } from "models";
import { VideoObject } from "models";
import { getVideoObject, getVodAsset, listVodAssets } from "graphql/queries";
import { createVideoObject, createVodAsset } from "graphql/mutations";
import {
  CreateVideoObjectMutation,
  CreateVodAssetInput,
  CreateVodAssetMutation,
  GetVodAssetQuery,
} from "API";
import { Transcription } from "models";

export const Transcript = (props: NodeViewProps) => {
  const { video } = props.node.attrs;
  const uploaderRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [token, setToken] = useState<string | null>();
  const [videoURL, setVideoURL] = useState<string | undefined>();

  const { highlights } = useHighlight(props.editor);
  const [isAssitantActive, setIsAssistantActive] = useState<boolean>(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!video) {
      uploaderRef.current?.click();
    }
  }, [video]);

  useEffect(() => {
    async function fetchVideoURL() {
      const videoAsset = (await API.graphql({
        query: getVodAsset,
        variables: { id: video.split(".")[0] },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: GetVodAssetQuery };

      const token = videoAsset.data?.getVodAsset?.video?.token;
      const asset = videoAsset.data?.getVodAsset?.video?.id;
      // awsOutputVideo + /assetID/ + assetID + extension + token
      const uri = `https://${awsvideoconfig.awsOutputVideo}/${asset}/${asset}.m3u8`;

      setVideoURL(uri);
      setToken(token);
    }
    if (video && !videoURL && !token) {
      fetchVideoURL();
    }
  }, [token, video, videoURL]);

  const onAssistantClose = () => setIsAssistantActive(false);

  const handleClickOnContent = (e: MouseEvent) => {
    if (
      e.target instanceof Element &&
      e.target.tagName.toLowerCase() === "mark"
    ) {
      // props.editor.chain().focus().unsetHighlight().run();
      let range = document.createRange();
      range.selectNodeContents(e.target);
      // const highlight = highlights[e.target.id];

      // range.setStart(highlight.startNode, highlight.startOffset);
      // range.setEnd(highlight.endNode, highlight.endOffset);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
  };
  const handleUploadModal = () => {
    setIsUploadModalOpen(!isUploadModalOpen);
  };
  const handleModalClose = () => {
    setIsUploadModalOpen(false);
  };

  /*
  TODO: 1. Trigger the transcription job?  
  SOLUTION: Create an entry in transcription table. A lambda function will listen to these change streams and then transcription job will be created in the lambda function.
  This function will only be triggered in case of new entries
  2. Show in progress state
  SOLUTION: When job is started then status will be changed to 'Enqueued', once the job is started status will be changed to 'INPROGRESS'
  3. Inject transcription when job succeeds
  SOLUTION: Once a new transcription is created in the s3 bucket then lambda will be trigged which will update the transcription table with the details.
  4. Render transcription appropriately
SOLUTION: Setup the subscription after starting the job so that once the status changes it is triggered and status is changed.


Unknowns:
1) Dynamodb change logs work as expected.
2) Differentiating new entries from updates in transcriber lambda
3) S3 trigger working as expected
4) Subscribing and unsubscribing on updateTranscriptions. It should only be triggered for the current transcription
  */
  const handleTranscription = async () => {
    //TODO: Check that transcription entry for the video shouldn't exist before hand.
    const transcription = await DataStore.save(
      new Transcription({
        video,
        status: TranscriptionStatus.ENQUEUED,
      })
    );
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files!![0];
    const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
    if (ext === "mp4") {
      Storage.configure({
        AWSS3: {
          bucket: awsvideoconfig.awsInputVideo,
          customPrefix: {
            public: "",
          },
        },
      });
    }

    const videoObject = (await API.graphql({
      query: createVideoObject,
      variables: {
        input: {},
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as { data: CreateVideoObjectMutation };
    const vodAsset = (await API.graphql({
      query: createVodAsset,
      variables: {
        input: {
          title: "Video title",
          description: "Video description",
          vodAssetVideoId: videoObject.data.createVideoObject?.id,
        } as CreateVodAssetInput,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as { data: CreateVodAssetMutation };
    const key = `${videoObject.data?.createVideoObject?.id}.${ext}`;
    console.log("asset", vodAsset);
    Storage.put(key, file, {
      resumable: true,
      completeCallback: (event) => {
        //update key on p
        props.updateAttributes({
          video: vodAsset.data.createVodAsset?.id,
        });
      },
      progressCallback: (progress) => {
        console.log(Math.round((progress.loaded / progress.total) * 100) + "%");
        setProgress(Math.round((progress.loaded / progress.total) * 100));
      },
      errorCallback: (err) => {
        console.error("Unexpected error while uploading", err);
      },
    });
    setProgress(10);
  };

  return (
    <TranscriptContainer>
      <EuiTitle>
        <h3>Transcript</h3>
      </EuiTitle>
      <TranscriptAssistant
        isOpen={isAssitantActive}
        onClose={onAssistantClose}
      />

      <EuiFieldText
        style={{ display: "none" }}
        type="file"
        inputRef={uploaderRef}
        accept="video/*"
        onChange={handleFileChange}
      />

      {videoURL && token ? (
        <EuiPanel borderRadius="m">
          <ReactPlayer
            width={"100%"}
            height={510}
            url={videoURL}
            config={{
              file: {
                hlsOptions: {
                  xhrSetup: function xhrSetup(xhr: any, url: string) {
                    xhr.setRequestHeader(
                      "Access-Control-Allow-Headers",
                      "Content-Type, Accept, X-Requested-With"
                    );
                    xhr.setRequestHeader(
                      "Access-Control-Allow-Origin",
                      "http://localhost:3000"
                    );
                    xhr.setRequestHeader(
                      "Access-Control-Allow-Credentials",
                      "true"
                    );
                    xhr.open("GET", url + token);
                  },
                },
              },
            }}
            playing={true}
            playbackRate={1.0}
            onError={(e) => console.log("onError", e)}
          />
          <EuiButton onClick={handleTranscription}>
            Start Transcribing
          </EuiButton>
        </EuiPanel>
      ) : (
        progress > 0 && (
          <EuiPanel color="subdued">
            <EuiText color="subdued">
              <EuiLoadingSpinner /> &nbsp; Upload in progress... {progress}%
            </EuiText>
          </EuiPanel>
        )
      )}

      <TranscriptContent
        className="content"
        contentEditable={false}
        onClick={handleClickOnContent}
      />
    </TranscriptContainer>
  );
};
