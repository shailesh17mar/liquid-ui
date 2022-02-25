import { useEffect, useState } from "react";
import { JSONContent, NodeViewProps } from "@tiptap/react";
import {
  DeleteButton,
  TranscriptContainer,
  TranscriptContent,
} from "./transcript.styles";
import { Highlights } from "models";
import { EuiConfirmModal, EuiTitle } from "@elastic/eui";
import { useParams } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import {
  HighlightState,
  highlightAtom,
} from "../../components/highlight-control/highlight-control";
import { useStory } from "core/modules/stories/hooks";
import {
  Annotation,
  annotationState,
} from "main/pages/make-story-details-page";
import { useHighlights } from "core/modules/highlights/hooks";
import { useTags } from "core/modules/tags/hooks";
import _ from "lodash";

export const transcriptAtom = atom<JSONContent | undefined>({
  key: "transcriptState",
  default: undefined,
});

export const initTranscript = atom<boolean>({
  key: "initTranscript",
  default: false,
});

export const Transcript = (props: NodeViewProps) => {
  const { id } = useParams() as { id: string };
  const [isDestroyModalVisible, setIsDestroyModalVisible] = useState(false);
  const [highlightState, setHighlightState] = useRecoilState(highlightAtom);
  const { id: transcriptId } = props.node.attrs;
  const [annotation, setAnnotation] = useRecoilState(annotationState);

  const { data: story } = useStory(id);

  const { data: tags } = useTags(story?.projectsID, Boolean(story?.projectsID));
  const { data: highlights } = useHighlights({
    transcriptId,
  });
  useEffect(() => {
    if (
      tags &&
      tags.length > 0 &&
      highlights &&
      highlights.length > 0 &&
      _.isEmpty(annotation)
    ) {
      const annotation = highlights.reduce<Annotation>(
        (acc, highlight: Highlights) => {
          const tagIds = highlight.tagIds?.split("|") || [];
          const selectedTags = tags.filter((tag) => tagIds.includes(tag.id));
          const annotationTags = selectedTags.map((tag) => {
            return {
              label: tag.label,
              id: tag.id,
            };
          });
          acc[highlight.id] = {
            type: highlight.type,
            tags: annotationTags,
          };
          return acc;
        },
        {}
      );
      setAnnotation(annotation);
    }
  }, [annotation, highlights, setAnnotation, tags]);

  useEffect(() => {
    setHighlightState({
      transcriptionId: transcriptId,
    } as HighlightState);
  }, [transcriptId]);

  const closeDestroyModal = () => setIsDestroyModalVisible(false);
  const showDestroyModal = () => setIsDestroyModalVisible(true);

  const handleDeleteTranscript = async () => {
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
        display="base"
        color="danger"
        onClick={showDestroyModal}
      />

      {isDestroyModalVisible && (
        <EuiConfirmModal
          title="Do you want to delete this transcript?"
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

      <TranscriptContent
        className="content"
        contentEditable={false}
        onClick={handleClickOnContent}
      />
    </TranscriptContainer>
  );
};
