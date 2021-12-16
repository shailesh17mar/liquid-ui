import { useEffect, useState } from "react";
import { NodeViewProps } from "@tiptap/react";
import { TranscriptContainer, TranscriptContent } from "./transcript.styles";
import { useHighlight } from "./hooks/use-highlight";
import { EuiButton, EuiPanel, EuiTitle } from "@elastic/eui";
import Dash from "@uppy/dashboard";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import GoogleDrive from "@uppy/google-drive";
import Zoom from "@uppy/zoom";
import Box from "@uppy/box";
import OneDrive from "@uppy/onedrive";
import ReactPlayer from "react-player";
import { TranscriptAssistant } from "./transcript-assistant";
import { DashboardModal, useUppy } from "@uppy/react";
import { data } from "presentation/modules/shared/components/transcript/dummy";

//transcript
//children

export const Transcript = (props: NodeViewProps) => {
  const uppy = useUppy(() => {
    return new Uppy({
      debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 10000000,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ["video/*"],
      },
    })
      .use(Tus, { endpoint: "https://tusd.tusdemo.net/files/" })
      .use(GoogleDrive, {
        companionUrl: "https://companion.uppy.io",
      })
      .use(Box, {
        companionUrl: "https://companion.uppy.io",
      })
      .use(Zoom, {
        companionUrl: "https://companion.uppy.io",
      })
      .use(OneDrive, {
        companionUrl: "https://companion.uppy.io",
      })
      .on("complete", (data) => {
        const doc = props.editor.getJSON();
        const content = doc.content?.map((el) => {
          if (el.type === "transcriptComponent")
            return {
              ...el,
              attrs: {
                ...el.attrs,
                id: "shailesh",
                video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
              },
            };
          return el;
        });
        props.editor.commands.setContent({ ...doc, content });
      });
  });

  const { highlights } = useHighlight(props.editor);
  const [isAssitantActive, setIsAssistantActive] = useState<boolean>(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

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

  return (
    <TranscriptContainer>
      <EuiTitle>
        <h3>Transcript</h3>
      </EuiTitle>
      <TranscriptAssistant
        isOpen={isAssitantActive}
        onClose={onAssistantClose}
      />

      {!props.node.attrs.video ? (
        <EuiPanel borderRadius="m" color="subdued">
          <EuiButton onClick={handleUploadModal}>Upload Interview</EuiButton>
          <DashboardModal
            uppy={uppy}
            plugins={["GoogleDrive", "OneDrive", "Box", "Zoom"]}
            closeModalOnClickOutside
            open={isUploadModalOpen}
            onRequestClose={handleModalClose}
          />
        </EuiPanel>
      ) : (
        <>
          <ReactPlayer
            width={"100%"}
            height={510}
            url={props.node.attrs.video}
          />
          <EuiPanel borderRadius="m">
            <EuiButton onClick={handleTranscription}>
              Start Transcribing
            </EuiButton>
          </EuiPanel>
        </>
      )}
      <TranscriptContent
        className="content"
        contentEditable={false}
        onClick={handleClickOnContent}
      />
    </TranscriptContainer>
  );
};
