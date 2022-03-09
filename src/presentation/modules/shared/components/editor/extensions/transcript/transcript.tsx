import { useEffect, useMemo, useState } from "react";
import { JSONContent, NodeViewProps } from "@tiptap/react";
import {
  DeleteButton,
  TranscriptContainer,
  TranscriptContent,
} from "./transcript.styles";
import { Highlights } from "models";
import { EuiConfirmModal, EuiTitle } from "@elastic/eui";
import { useParams } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useStory } from "core/modules/stories/hooks";
import {
  Annotation,
  annotationState,
} from "main/pages/make-story-details-page";
import { useHighlights } from "core/modules/highlights/hooks";
import { useTags } from "core/modules/tags/hooks";
import _ from "lodash";
import { useVideo } from "react-use";
import {
  highlightAtom,
  HighlightState,
} from "../../components/highlight-control/tag-manager";

export const transcriptAtom = atom<JSONContent | undefined>({
  key: "transcriptState",
  default: undefined,
});

export const initTranscript = atom<boolean>({
  key: "initTranscript",
  default: false,
});

export const Transcript = (props: NodeViewProps) => {
  // const { id } = useParams() as { id: string };
  const [isDestroyModalVisible, setIsDestroyModalVisible] = useState(false);
  const [highlightState, setHighlightState] = useRecoilState(highlightAtom);
  const { transcriptId } = props.node.attrs;

  useEffect(() => {
    setHighlightState({
      transcriptionId: transcriptId,
    } as HighlightState);
  }, [transcriptId]);

  const closeDestroyModal = () => setIsDestroyModalVisible(false);
  const showDestroyModal = () => setIsDestroyModalVisible(true);

  const handleDeleteTranscript = () => {
    props.deleteNode();
  };

  const handleClickOnContent = (e: MouseEvent) => {
    if (e.target instanceof Element && e.target.hasAttribute("data-hid")) {
      let range = document.createRange();
      const highlightId = e.target.getAttribute("data-hid");
      const highlightType = e.target.getAttribute("data-hc");
      var rootNode = e.target.parentNode;
      if (rootNode) {
        const selector = `span[data-hid="${highlightId}"]`;
        const items = rootNode.querySelectorAll(selector);
        range.setStart(items[0], 0);
        range.setEnd(items[items.length - 1], 1);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        setHighlightState({
          id: highlightId,
          type: highlightType,
          transcriptionId: transcriptId,
          startTime: parseInt(items[0].getAttribute("data-m") || "-1"),
          endTime: parseInt(
            items[items.length - 1].getAttribute("data-m") || "-1"
          ),
        } as HighlightState);
      }
      // props.editor.chain().focus().unsetHighlight().run();
      // let range = document.createRange();
      // range.selectNodeContents(e.target);
      // // const highlight = highlights[e.target.id];

      // // range.setStart(highlight.startNode, highlight.startOffset);
      // // range.setEnd(highlight.endNode, highlight.endOffset);
      // window.getSelection()?.removeAllRanges();
      // window.getSelection()?.addRange(range);
    }
  };

  return (
    <TranscriptContainer>
      <EuiTitle>
        <h3>Transcript</h3>
      </EuiTitle>
      <DeleteButton
        iconType="trash"
        aria-label="Delete transcript"
        color="danger"
        size="s"
        onClick={showDestroyModal}
      >
        Delete transcript
      </DeleteButton>

      {isDestroyModalVisible && (
        <EuiConfirmModal
          title="Do you want to delete this transcript?"
          onCancel={closeDestroyModal}
          onConfirm={() => handleDeleteTranscript()}
          cancelButtonText="No"
          confirmButtonText="Yes, Please"
          buttonColor="danger"
          defaultFocusedButton="confirm"
        >
          <p>Are you sure you want to do this?</p>
        </EuiConfirmModal>
      )}

      <TranscriptContent
        contentEditable={false}
        onClick={handleClickOnContent}
      />
    </TranscriptContainer>
  );
};
