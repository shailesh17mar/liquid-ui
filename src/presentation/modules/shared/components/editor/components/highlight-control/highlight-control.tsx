import {
  EuiButtonIcon,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHealth,
  EuiPanel,
  EuiSelectable,
} from "@elastic/eui";
import { Editor } from "@tiptap/react";
import _ from "lodash";
import {
  Annotation,
  annotationState,
} from "main/pages/make-story-details-page";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { useStoryMetadata } from "presentation/modules/stories/story-context";
import {
  useCreateHighlight,
  useUpdateHighlight,
} from "core/modules/highlights/hooks";
import { useCreateTag, useTags } from "core/modules/tags/hooks";
import { useHighlight } from "core/modules/highlights/hooks/use-highlight";
import { useDebouncedCallback } from "use-debounce";
import { ColorPicker } from "./color-picker";
import { Highlights } from "API";

interface Props {
  id?: string;
  editor: Editor;
}

const POPOVER_STYLE = {
  zIndex: 200,
  minWidth: 300,
};
const COMBO_POPOVER_STYLE = { zIndex: 200, minWidth: 500 };

export const HIGHLIGHT_TYPES: {
  [key: string]: { color: string; label: string };
} = {
  excited: {
    color: "#fbbc04",
    label: "😁 Excited",
  },
  angry: {
    color: "#f28b82",
    label: "😡 Angry",
  },
  embarrassed: {
    label: "😳 Embarrassed",
    color: "#fdcfe8",
  },
  pain: {
    color: "#fff475",
    label: "☇ Pain",
  },
  goal: {
    color: "#ccff90",
    label: "🥅 Goal or job-to-be-done",
  },
  obstacle: {
    color: "#e6c9a8",
    label: "🪨 Obstacle",
  },
  workaround: {
    color: "#d7aefb",
    label: "⤴ Workaround",
  },
  context: {
    color: "#aecbfa",
    label: "^ Background",
  },
  money: {
    color: "#178117",
    label: "＄ Money",
  },
  feature: {
    color: "#e8eaed",
    label: "☑ Feature",
  },
  entity: {
    color: "#cbf0f8",
    label: "♀ Entity",
  },
};
const defaultType = "pain";

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

export const HighlightControl: React.FC<Props> = ({ editor }) => {
  const storyMetadata = useStoryMetadata();
  const setAnnotation = useSetRecoilState<Annotation>(annotationState);
  const highlightProps = useRecoilValue(highlightAtom);
  const [highlightState, setHighlightState] = useState<Highlights>();

  const { data: tags } = useTags(storyMetadata.projectId);
  const { data: highlight } = useHighlight(highlightProps?.id);
  const createHighlightMutation = useCreateHighlight();
  const updateHighlightMutation = useUpdateHighlight();
  const createTagMutation = useCreateTag();

  const [highlightId, setHighlightId] = useState<string | null>(
    highlightProps && highlightProps.id
  );
  const [newTag, setNewTag] = useState<string | undefined>();
  const [tagOptions, setTagOptions] = useState<any[]>([]);
  //get the relevant state
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [hasTagsChanged, setHasTagsChanged] = useState(false);

  // Effect to fetch highlight for existing highlights
  useEffect(() => {
    if (highlight) {
      setHighlightState(highlight);
    }
  }, [highlight]);

  useEffect(() => {
    if (tags && tagOptions.length === 0) {
      const tagIds =
        highlightState && highlightState.tagIds
          ? highlightState.tagIds.split("|")
          : [];
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
      setSelectedTags(selectedTags);
    }
  }, [highlightState, tagOptions.length, tags]);

  useEffect(() => {
    if (highlightState) {
    }
  }, [highlightState]);

  const saveTags = useDebouncedCallback(async (tags: string[]) => {
    if (highlightState && highlightState.id) {
      await updateHighlightMutation.mutateAsync({
        id: highlightState.id,
        tagIds: tags.join("|"),
        _version: highlightState._version,
      });
    }
  }, 3000);

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

  useEffect(() => {
    if (hasTagsChanged) {
      const tagIds = selectedTags.map(
        (option: any) => option.id as unknown as string
      );
      saveTags(tagIds);
      setHasTagsChanged(false);
    }
  }, [hasTagsChanged, saveTags, selectedTags]);

  const saveHighlight = async (
    type: string,
    tagIds: string[] = [],
    startTime?: number,
    endTime?: number
  ) => {
    const selection = window.getSelection();
    if (!selection) {
      throw new Error("No selection ");
    }
    const range = selection.getRangeAt(0);
    const text = range.toString();
    if (
      highlightState &&
      highlightState.id &&
      (text !== highlightState.text ||
        type !== highlightState.type ||
        startTime !== highlightState.startTime ||
        endTime !== highlightState.endTime)
    ) {
      const updatedHighlight = await updateHighlightMutation.mutateAsync({
        id: highlightState.id,
        type: type,
        text,
        startTime,
        endTime,
        _version: highlightState._version,
      });
      setHighlightState(updatedHighlight);
      return highlightState.id;
    } else {
      const transcriptionID = highlightProps?.transcriptionId!!;
      const newHighlight = await createHighlightMutation.mutateAsync({
        text,
        type: type,
        transcriptionID,
        startTime,
        tagIds: tagIds.length > 0 ? tagIds.join("|") : undefined,
        endTime,
        projectsID: storyMetadata.projectId,
      });
      if (newHighlight) {
        setHighlightId(newHighlight.id);
        setHighlightState(newHighlight);
        return newHighlight.id;
      }
    }
  };

  const toggleHighlight = (highlightId: string, highlightCategory: string) => {
    editor.commands.toggleTHighlight({
      highlightId,
      highlightCategory,
    });

    const selector = `span[data-hid="${highlightId}"]`;
    const items = document.querySelectorAll(selector);
    const startTime = parseInt(items[0].getAttribute("data-m") || "-1");
    const endTime = parseInt(
      items[items.length - 1].getAttribute("data-m") || "-1"
    );
    saveHighlight(highlightId, [], startTime, endTime);
  };

  const handleTagCreation = (e: any) => {
    const createTag = async (newOption: { label: string }) => {
      const newTag = await createTagMutation.mutateAsync({
        label: newOption.label,
        projectsID: storyMetadata.projectId,
      });
      if (newTag) {
        const option = { label: newTag.label, id: newTag.id };
        setTagOptions([...tagOptions, option]);
        setSelectedTags([...selectedTags, option]);
      }

      setHasTagsChanged(true);
      setNewTag("");
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
    const manageTags = (id: string, type: string) => {
      setAnnotation((annotation) => {
        return {
          ...annotation,
          [id]: {
            type,
            tags: selectedOptions,
          },
        };
      });
      setSelectedTags(selectedOptions);
      setTagOptions(newOptions);
      setHasTagsChanged(true);
      toggleHighlight(id, type);
      highlightOnDOM(id);
    };
    if (!highlightState) {
      const tagIds = selectedOptions.map(
        (option: any) => option.id as unknown as string
      );
      const newHighlightId = await saveHighlight(defaultType, tagIds);
      if (newHighlightId) {
        manageTags(newHighlightId, defaultType);
      } else {
        throw new Error("Highlight could not be saved");
      }
    } else {
      // saveHighlight(highlight.type);
      manageTags(highlightState.id!!, highlightState.type!!);
    }
  };

  const handleColorChange = (type: string) => {
    if (highlightId) {
      toggleHighlight(highlightId, type);
      saveHighlight(type);
      setAnnotation((annotation) => {
        return {
          ...annotation,
          [highlightId]: {
            type,
            tags: selectedTags,
          },
        };
      });
      highlightOnDOM(highlightId);
    }
  };

  const handleDeleteHighlight = () => {
    editor.commands.unsetTHighlight();
  };

  const Selectable = useMemo(
    () => (
      <EuiSelectable
        aria-label="Tags"
        allowExclusions={false}
        options={tagOptions}
        onChange={handleTagsChange}
        listProps={{ bordered: true }}
      >
        {(list) => list}
      </EuiSelectable>
    ),
    [tagOptions]
  );
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
                      onKeyUp={handleTagCreation}
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
              <EuiFlexItem>{Selectable}</EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          {selectedTags && selectedTags.length > 0 && (
            <EuiFlexItem>
              <ColorPicker
                selected={highlightState?.type}
                onChange={handleColorChange}
              />
            </EuiFlexItem>
          )}
        </EuiFlexGroup>
      </div>
    </EuiPanel>
  );
};
