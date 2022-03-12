import {
  EuiButtonIcon,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSelectable,
} from "@elastic/eui";
import { Editor } from "@tiptap/react";
import _ from "lodash";
import {
  Annotation,
  annotationState,
} from "main/pages/make-story-details-page";
import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useStoryMetadata } from "presentation/modules/stories/story-context";
import {
  useCreateHighlight,
  useDeleteHighlight,
  useUpdateHighlight,
} from "core/modules/highlights/hooks";
import { useCreateTag, useTags } from "core/modules/tags/hooks";
import { useHighlight } from "core/modules/highlights/hooks/use-highlight";
import { useDebouncedCallback } from "use-debounce";
import { ColorPicker } from "./color-picker";
import { nanoid } from "nanoid";
import { Highlights } from "API";
import { useDefaultTagCategory } from "core/modules/tag-categories/hooks/use-tag-category";
import { HighlightType } from "models";
import { useAuth } from "presentation/context/auth-context";

interface Props {
  id?: string;
  editor: Editor;
  isTranscript?: boolean;
}

const POPOVER_STYLE = {
  zIndex: 200,
  minWidth: 300,
};
const COMBO_POPOVER_STYLE = { zIndex: 200, minWidth: 500 };

const defaultType = "pain";

export interface HighlightState {
  id: string;
  type: string;
  transcriptionId?: string;
  startTime?: number;
  endTime?: number;
}
export interface HighlightState {
  id: string;
  type: string;
  transcriptionId?: string;
  startTime?: number;
  endTime?: number;
}

export const highlightAtom = atom<HighlightState | null>({
  key: "highlightState",
  default: null,
});

export const TagManager: React.FC<Props> = ({ editor, id, isTranscript }) => {
  const { user } = useAuth();
  const storyMetadata = useStoryMetadata();
  const createTagMutation = useCreateTag();
  const createHighlightMutation = useCreateHighlight();
  const updateHighlightMutation = useUpdateHighlight();
  const deleteHighlightMutation = useDeleteHighlight();
  const setAnnotation = useSetRecoilState<Annotation>(annotationState);
  const highlightProps = useRecoilValue(highlightAtom);
  const [highlightState, setHighlightState] = useState<Highlights>();
  const [color, setColor] = useState("pain");

  const { data: tags } = useTags(storyMetadata.projectId);
  const { data: defaultTagCategory } = useDefaultTagCategory(
    storyMetadata.projectId
  );
  const { data: highlight } = useHighlight(highlightProps?.id);
  const [newTag, setNewTag] = useState<string>("");
  const [tagCreatedSuccessfully, setTagCreatedSuccessfully] = useState(false);
  const [tagOptions, setTagOptions] = useState<any[]>([]);
  const selectedTags = tagOptions.filter(
    (option) => option.checked && option.checked === "on"
  );

  useEffect(() => {
    if (highlight) {
      setHighlightState(highlight);
      setColor(highlight.color);
    }
  }, [highlight, highlightState]);

  useEffect(() => {
    setTagOptions([]);
    setHighlightState(undefined);
  }, [id]);

  useEffect(() => {
    if (tags && (tagOptions.length === 0 || highlight)) {
      // const tagIds =
      // highlight && highlight.tagIds ? highlight.tagIds.split("|") : [];
      const tagIds = highlight && highlight.Tags ? highlight.Tags : [];
      const selectedTags: any[] = [];
      const options = tags.map((option) => {
        const checked = tagIds.includes(option.id) ? "on" : null;
        const selectOption = { label: option.label, id: option.id, checked };
        if (checked) {
          selectedTags.push(selectOption);
        }
        return selectOption;
      });
      setTagOptions(options);
    }
  }, [highlight, tags, id, tagOptions.length, highlightState?.id]);

  const createHighlight = async (
    id: string,
    color: string,
    tagIds: string[] = []
  ) => {
    const selector = `span[data-hid="${id}"]`;
    const words = document.querySelectorAll(selector);
    const startTime = isTranscript
      ? parseInt(words[0].getAttribute("data-m") || "-1")
      : undefined;
    const endTime = isTranscript
      ? parseInt(words[words.length - 1].getAttribute("data-m") || "-1")
      : undefined;
    const text = Array.from(words)
      .map((span) => span.textContent)
      .join(" ");
    const newHighlight = await createHighlightMutation.mutateAsync({
      id,
      text,
      color,
      type: isTranscript ? HighlightType.TRANSCRIPT : HighlightType.NORMAL,
      startTime,
      user: JSON.stringify(user),
      Tags: tagIds,
      tagIds: tagIds.length > 0 ? tagIds.join("|") : undefined,
      endTime,
      projectsID: storyMetadata.projectId,
      storyID: storyMetadata.id,
    });
    if (newHighlight) {
      setHighlightState(newHighlight);
    } else {
      throw new Error("Highlight cannot be saved");
    }
  };

  const updateHighlight = useDebouncedCallback(
    async (color: string, tags: string[]) => {
      if (highlightState) {
        const updatedHighlight = await updateHighlightMutation.mutateAsync({
          id: highlightState.id!!,
          color,
          type: HighlightType.TRANSCRIPT,
          Tags: tags.map((option: any) => option.id as unknown as string),
          tagIds: tags
            .map((option: any) => option.id as unknown as string)
            .join("|"),
        });
        if (updatedHighlight) setHighlightState(updatedHighlight);
      }
    },
    500
  );
  const highlightOnDOM = (id: string) => {
    let range = document.createRange();
    const selector = `span[data-hid="${id}"]`;
    const items = document.querySelectorAll(selector);
    range.setStart(items[0], 0);
    range.setEnd(items[items.length - 1], 1);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    return range;
  };

  const reset = () => {
    setHighlightState(undefined);
    tags && setTagOptions(tags);
    setColor("pain");
  };
  const toggleHighlight = (highlightId: string, highlightCategory: string) => {
    if (isTranscript) {
      editor.commands.toggleTHighlight({
        highlightId,
        highlightCategory,
      });
    } else {
      editor.commands.toggleHighlight({
        highlightId,
        highlightCategory,
      });
    }
  };

  const handleHighlightSelection = () => {
    if (!highlightState) toggleHighlight(id!!, color);
  };
  const handleInputBlur = () => {
    if (!highlightState && !tagCreatedSuccessfully) {
      editor.commands.unsetTHighlight();
    }
    setTagCreatedSuccessfully(false);
  };
  const handleNewTag = (e: any) => {
    const createTag = async (newOption: { label: string }) => {
      const tagId = nanoid();
      const highlightId = nanoid();
      const newTag = {
        id: tagId,
        label: newOption.label,
        projectsID: storyMetadata.projectId,
        tagCategoryId: defaultTagCategory?.id,
      };
      const option = { label: newTag.label, id: newTag.id, checked: "on" };
      const newOptions = [option, ...tagOptions];
      const selectedOptions = newOptions.filter(
        (option) => option.checked && option.checked === "on"
      );
      setAnnotation((annotation) => {
        return {
          ...annotation,
          [id!!]: {
            type: color,
            tags: selectedOptions,
          },
        } as Annotation;
      });
      setTagOptions(newOptions);
      createTagMutation.mutate(newTag);
      if (highlightState) {
        updateHighlight(color, selectedOptions);
      } else {
        createHighlight(id!!, color, [newTag.id]);
      }
      //create new Tag
      setNewTag("");
      setTagCreatedSuccessfully(true);
    };
    if (e.key === "Enter" || e.keyCode === 13) {
      const newOption = {
        label: e.target.value,
      };
      createTag(newOption);
    }
  };

  const handleTagsChange = async (newOptions: any[]) => {
    const selectedOptions = newOptions.filter(
      (option) => option.checked && option.checked === "on"
    );
    setTagOptions(newOptions);
    const tagIds = selectedOptions.map(
      (option: any) => option.id as unknown as string
    );
    if (!highlightState) {
      const id = nanoid();
      toggleHighlight(id, color);
      setAnnotation((annotation) => {
        return {
          ...annotation,
          [id]: {
            type: color,
            tags: selectedOptions,
          },
        } as Annotation;
      });
      createHighlight(id, color, tagIds);
    } else {
      setAnnotation((annotation) => {
        return {
          ...annotation,
          [highlightState.id!!]: {
            type: color,
            tags: selectedOptions,
          },
        } as Annotation;
      });
      updateHighlight(color, selectedOptions);
    }
  };

  const handleColorChange = (color: string) => {
    if (highlightState) {
      setColor(color);
      toggleHighlight(highlightState.id!!, color);
      updateHighlight(color, selectedTags);
    }
  };

  const handleDeleteHighlight = async () => {
    if (highlightState && highlightState.id) {
      editor.commands.unsetTHighlight();
      const id = highlightState.id;
      setAnnotation((annotation) => {
        delete annotation[id];
        return annotation;
      });
      deleteHighlightMutation.mutateAsync({
        id,
      });
      reset();
    }
  };

  return (
    <EuiPanel>
      <div style={POPOVER_STYLE}>
        <EuiFlexGroup direction="column" gutterSize="s">
          <EuiFlexItem>
            <EuiFlexGroup direction="column" gutterSize="l">
              <EuiFlexItem>
                <EuiFlexGroup alignItems="center">
                  <EuiFlexItem>
                    <EuiFieldText
                      fullWidth
                      placeholder="Create new Tag"
                      value={newTag}
                      onFocus={handleHighlightSelection}
                      onBlur={handleInputBlur}
                      onKeyUp={handleNewTag}
                      onChange={(e) => setNewTag(e.target.value)}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiButtonIcon
                      iconType="trash"
                      aria-label="Delete Highlight"
                      display="base"
                      color="danger"
                      onClick={handleDeleteHighlight}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiSelectable
                  aria-label="Tags"
                  allowExclusions={false}
                  options={tagOptions}
                  onChange={handleTagsChange}
                  listProps={{ bordered: true }}
                >
                  {(list) => list}
                </EuiSelectable>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          {selectedTags.length > 0 && (
            <EuiFlexItem>
              <ColorPicker selected={color} onChange={handleColorChange} />
            </EuiFlexItem>
          )}
        </EuiFlexGroup>
      </div>
    </EuiPanel>
  );
};
