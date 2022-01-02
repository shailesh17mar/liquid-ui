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
import { VodAsset } from "models";
import { VideoObject } from "models";
import { getVideoObject, getVodAsset, listVodAssets } from "graphql/queries";

export const Transcript = (props: NodeViewProps) => {
  const { video } = props.node.attrs;
  const uploaderRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
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
      const y = await API.graphql({
        query: listVodAssets,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(y);

      if (video && !videoURL) {
        const x = await API.graphql({
          query: getVodAsset,
          variables: { id: video.split(".")[0] },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        // const x = await DataStore.query(VodAsset, video);
        console.log(x);
        const uri = await Storage.get(video, {
          level: "public",
        });
        console.log(uri);
        setVideoURL(uri);
      }
    }
    fetchVideoURL();
  }, [video, videoURL]);

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
  const handleTranscription = () => {
    const doc = props.editor.getJSON();
    const content = doc.content?.map((el) => {
      if (el.type === "transcriptComponent")
        return {
          ...el,
          content: data,
        };
      return el;
    });
    props.editor.commands.setContent({ ...doc, content });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files!![0];
    const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
    const assetId = nanoid();
    const key = `${assetId}.${ext}`;
    if (ext === "mp4") {
      Storage.configure({
        AWSS3: {
          bucket: awsvideoconfig.awsInputVideo,
          customPrefix: {
            public: "public",
          },
        },
      });
    }

    const videoObject = new VideoObject({});
    const x = await DataStore.save(videoObject);
    console.log("id of videoObject", x.id);
    const videoAsset = new VodAsset({
      title: "Video title",
      description: "Video description",
      video: x,
    });
    const vodAsset = await DataStore.save(videoAsset);
    Storage.put(key, file, {
      resumable: true,
      completeCallback: (event) => {
        //update key on p
        props.updateAttributes({
          video: vodAsset.id,
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

      {videoURL ? (
        <EuiPanel borderRadius="m">
          <ReactPlayer width={"100%"} height={510} url={videoURL} />
          <EuiButton onClick={handleTranscription}>
            Start Transcribing
          </EuiButton>
        </EuiPanel>
      ) : (
        progress > 0 && (
          <EuiPanel color="subdued">
            <EuiText color="subdued">
              <EuiLoadingSpinner /> &nbsp; Upload in progress
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
