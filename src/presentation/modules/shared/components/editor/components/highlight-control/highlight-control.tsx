import {
  EuiButton,
  EuiComboBoxOptionOption,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHealth,
  EuiHorizontalRule,
  EuiPanel,
  EuiSelectable,
  EuiSpacer,
  EuiSuperSelect,
  EuiTextColor,
  htmlIdGenerator,
} from "@elastic/eui";
import { Editor } from "@tiptap/react";
import _ from "lodash";
import {
  Annotation,
  annotationState,
} from "main/pages/make-story-details-page";
import { useCallback, useEffect, useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { transcriptAtom } from "../../extensions/transcript/transcript";
import { useParams } from "react-router-dom";
import { useStoryMetadata } from "presentation/modules/stories/story-context";
import {
  useCreateHighlight,
  useUpdateHighlight,
} from "core/modules/highlights/hooks";
import { useCreateTag, useTags } from "core/modules/tags/hooks";
import { retrieveHighlightById } from "core/modules/highlights/hooks/use-highlight";
import { Highlights } from "API";
import { useDebouncedCallback } from "use-debounce";

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
const defaultType = "goal";

export interface HighlightState {
  id: string;
  type: string;
  transcriptionId?: string;
}
export const highlightAtom = atom<HighlightState | null>({
  key: "highlightState",
  default: null,
});

export const HighlightControl: React.FC<Props> = ({ editor }) => {
  const { id: storyId } = useParams() as { id: string };
  const newId = htmlIdGenerator()();
  const storyMetadata = useStoryMetadata();
  const [annotation, setAnnotation] =
    useRecoilState<Annotation>(annotationState);
  const transcriptState = useRecoilValue(transcriptAtom);
  const highlightState = useRecoilValue(highlightAtom);
  const [highlight, setHighlight] = useState<Highlights>();
  const { data: tags } = useTags(storyMetadata.projectId);
  const createHighlightMutation = useCreateHighlight();
  const updateHighlightMutation = useUpdateHighlight();
  const createTagMutation = useCreateTag();
  const [highlightId, setHighlightId] = useState<string | null>(
    highlightState && highlightState.id
  );
  const highlightCategory = highlightState ? highlightState.type : undefined;
  const [newTag, setNewTag] = useState<string | undefined>();
  const [eg1IsOpen, setEg1IsOpen] = useState<boolean>(false);
  const [eg2IsOpen, setEg2IsOpen] = useState<boolean>(false);
  //let this state be maintained by the component since later on this will be async
  const [tagOptions, setTagOptions] = useState<any[]>([]);
  //get the relevant state
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [hasTagsChanged, setHasTagsChanged] = useState(false);

  useEffect(() => {
    async function fetchHighlight() {
      if (highlightState?.id) {
        const highlight = await retrieveHighlightById(highlightState.id);
        setHighlight(highlight);
      }
    }
    if (highlightState?.id) {
      fetchHighlight();
    }
  }, [highlightState?.id]);

  useEffect(() => {
    if (tagOptions.length === 0 && tags && highlight) {
      const tagIds = highlight.tagIds ? highlight.tagIds.split("|") : [];
      const options = tags.map((option) => {
        const checked = tagIds.includes(option.id) && "on";
        return { label: option.label, id: option.id, checked };
      });
      setTagOptions(options);
    }
  }, [highlight, tagOptions.length, tags]);

  const saveTags = useDebouncedCallback(async (tags: string[]) => {
    if (highlight && highlight.id) {
      await updateHighlightMutation.mutateAsync({
        id: highlight.id,
        tagIds: tags.join("|"),
        _version: highlight._version,
      });
    }
  }, 3000);

  const highlightOnDOM = useCallback(() => {
    let range = document.createRange();
    const selector = `span[data-hid="${highlight?.id}"]`;
    const items = document.querySelectorAll(selector);
    range.setStart(items[0], 0);
    range.setEnd(items[items.length - 1], 1);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    return range;
  }, [highlight?.id]);

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
    text: string,
    highlightCategory: string,
    tagIds?: string[]
  ) => {
    if (highlight) {
      const updatedHighlight = await updateHighlightMutation.mutateAsync({
        id: highlight.id!!,
        type: highlightCategory,
        text,
        _version: highlight._version,
      });
      setHighlight(updatedHighlight);
      return highlight.id;
    } else {
      const transcriptionID = highlightState?.transcriptionId!!;
      const highlight = await createHighlightMutation.mutateAsync({
        text,
        type: highlightCategory,
        transcriptionID,
        projectsID: storyMetadata.projectId,
      });
      if (highlight) {
        setHighlightId(highlight.id);
        setHighlight(highlight);
        return highlight.id;
      }
    }
  };

  const toggleHighlight = async (
    highlightCategory: string,
    tagIds?: string[]
  ) => {
    if (window) {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        const text = range.toString();
        const highlightId = await saveHighlight(
          text,
          highlightCategory,
          tagIds
        );
        highlightId &&
          editor.commands.toggleTHighlight({
            highlightId,
            highlightCategory,
          });

        if (window.getSelection) {
          const selection = window.getSelection();
          if (selection) {
            if (selection.empty) {
              // Chrome
              selection.empty();
            } else if (selection.removeAllRanges) {
              // Firefox
              selection.removeAllRanges();
            }
          }
        }
        return highlightId;
      }
    }
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
  const handleTagCreate = (
    searchValue: string,
    flattenedOptions: EuiComboBoxOptionOption[] = []
  ) => {
    const createTag = async (newOption: { label: string }) => {
      if (
        flattenedOptions.findIndex(
          (option) =>
            option.label.trim().toLowerCase() === normalizedSearchValue
        ) === -1
      ) {
        const newTag = await createTagMutation.mutateAsync({
          label: newOption.label,
          projectsID: storyMetadata.projectId,
        });
        if (newTag) {
          const option = { label: newTag.label, id: newTag.id };
          setTagOptions([...tagOptions, option]);
          setSelectedTags([...selectedTags, option]);
        }
      } else {
        setSelectedTags([...selectedTags, newOption]);
      }
      setHasTagsChanged(true);
      // highlightOnDOM();
    };

    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        (option) => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
    }

    createTag(newOption);
  };

  const handleTagsChange = (newOptions: any[]) => {
    const selectedOptions = newOptions.filter(
      (option) => option.checked && option.checked === "on"
    );
    if (highlight?.id) {
      // const highlightId = toggleHighlight()
    } else {
    }
    setHasTagsChanged(true);
    if (highlight?.id && highlight?.type) {
      setAnnotation({
        ...annotation,
        [highlight.id]: {
          type: highlight.type,
          tags: selectedOptions,
        },
      });
    }
    setSelectedTags(selectedOptions);
    setTagOptions(newOptions);
    highlightOnDOM();
    // syncRelationship(
    //   highlightId,
    //   new Set(
    //     selectedOptions.map((option: any) => option.id as unknown as string)
    //   )
    // );
  };

  const onHighlightChange = (value: string) => {
    toggleHighlight(value);
    if (highlightId) {
      setAnnotation({
        ...annotation,
        [highlightId]: {
          type: value,
          tags: selectedTags,
        },
      });
    }
  };

  const options = Object.keys(HIGHLIGHT_TYPES).map((key) => {
    const value = HIGHLIGHT_TYPES[key];
    return {
      value: key,
      inputDisplay: (
        <EuiHealth color={value.color} style={{ lineHeight: "inherit" }}>
          {value.label}
        </EuiHealth>
      ),
    };
  });

  const onBlur = () => {
    highlightOnDOM();
  };

  const handleDeleteHighlight = () => {
    editor.commands.unsetTHighlight();
  };

  return (
    <EuiPanel>
      <div style={POPOVER_STYLE}>
        <EuiFlexGroup direction="column" gutterSize="s">
          <EuiFlexItem>
            <EuiTextColor color="subdued">Highlight</EuiTextColor>
            <EuiSpacer />
            <EuiSuperSelect
              options={options}
              valueOfSelected={highlight?.type}
              onChange={onHighlightChange}
            />
          </EuiFlexItem>
          {highlight?.type && (
            <>
              <EuiHorizontalRule margin="s" />
              <EuiFlexItem>
                <EuiTextColor color="subdued">Tagging</EuiTextColor>
                <EuiSpacer />
                <EuiFlexGroup direction="column" gutterSize="l">
                  <EuiFlexItem>
                    <EuiFieldText
                      placeholder="Enter tag"
                      value={newTag}
                      onKeyUp={handleTagCreation}
                    />
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
              <EuiHorizontalRule margin="s" />
              <EuiFlexItem>
                <EuiButton
                  color="accent"
                  fullWidth
                  onClick={handleDeleteHighlight}
                >
                  Delete Highlight
                </EuiButton>
              </EuiFlexItem>
            </>
          )}
        </EuiFlexGroup>
      </div>
    </EuiPanel>
  );
};
