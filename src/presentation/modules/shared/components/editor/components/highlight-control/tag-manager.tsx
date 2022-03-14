import {
  EuiBadge,
  EuiButtonIcon,
  EuiColorPicker,
  EuiColorPickerSwatch,
  EuiComboBox,
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
import { useEffect, useMemo, useState } from "react";
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
import { ColorPicker, HIGHLIGHT_COLORS, HIGHLIGHT_TYPES } from "./color-picker";
import { nanoid } from "nanoid";
import { CreateTagCategoryInput, CreateTagsInput, Highlights } from "API";
import { useDefaultTagCategory } from "core/modules/tag-categories/hooks/use-tag-category";
import { HighlightType } from "models";
import { useAuth } from "presentation/context/auth-context";
import { useCreateTagCategory } from "core/modules/tag-categories/hooks";
import all from "mdast-util-to-hast/lib/all";

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

const defaultType = "default";

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
  const [color, setColor] = useState(defaultType);
  const [clear, setClear] = useState(false);
  const [categoryColor, setCategoryColor] = useState(
    HIGHLIGHT_TYPES[defaultType].color
  );

  const colorType = useMemo(() => {
    return Object.keys(HIGHLIGHT_TYPES).find(
      (highlightType) =>
        HIGHLIGHT_TYPES[highlightType as HIGHLIGHT_COLORS].color ===
        categoryColor
    )!!;
  }, [categoryColor]);

  const swatches = useMemo(
    () => Object.values(HIGHLIGHT_TYPES).map((highlight) => highlight.color),
    []
  );
  const { data: tags } = useTags(storyMetadata.projectId);
  const { data: defaultTagCategory } = useDefaultTagCategory(
    storyMetadata.projectId
  );
  const { data: highlight } = useHighlight(highlightProps?.id);
  const [newTag, setNewTag] = useState<string>("");
  const [tagCreatedSuccessfully, setTagCreatedSuccessfully] = useState(false);

  const [allOptions, setAllOptions] = useState<any[]>([]);
  const selectedTags = allOptions.filter(
    (option) => option.checked && option.checked === "on"
  );
  const [selectedOptions, setSelected] = useState<any[]>([]);

  useEffect(() => {
    if (highlight) {
      setHighlightState(highlight);
      setColor(highlight.color);
    }
  }, [highlight, highlightState]);

  useEffect(() => {
    // setTagOptions([]);
    // setAllOptions([]);
    setSelected([]);
    setClear(true);
    setHighlightState(undefined);
  }, [id]);

  useEffect(() => {
    if (tags && (allOptions.length === 0 || highlight)) {
      // const tagIds =
      // highlight && highlight.tagIds ? highlight.tagIds.split("|") : [];
      const tagIds = highlight && highlight.Tags ? highlight.Tags : [];
      const selectedTags: any[] = [];
      const options = tags.map((option) => {
        const checked = tagIds.includes(option.id);
        const selectOption = {
          label: option.label,
          id: option.id,
          color:
            //@ts-ignore
            HIGHLIGHT_TYPES[option.tagCategory.color || option.color].color,
          category: option.tagCategory.name || "Uncategorized",
        };
        if (checked) {
          const { category, ...test } = selectOption;
          selectedTags.push(test);
        }
        return selectOption;
      });
      const groupedTags = options.reduce((acc: any, option) => {
        const { category, ...tagOption } = option;
        if (!acc[category]) {
          acc[category] = {
            label: category,
            options: [],
          };
        }
        acc[category].options.push(tagOption);
        return acc;
      }, {});
      setAllOptions(Object.values(groupedTags));
      setSelected(selectedTags);
      // setTagOptions(options);
    }
  }, [highlight, tags, id, allOptions.length, highlightState?.id]);

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
          type: HighlightType.TRANSCRIPT,
          Tags: tags.map((option: any) => option.id as unknown as string),
          color,
          tagIds: tags
            .map((option: any) => option.id as unknown as string)
            .join("|"),
        });
        if (updatedHighlight) setHighlightState(updatedHighlight);
      }
    },
    500
  );

  const reset = () => {
    setHighlightState(undefined);
    tags && setAllOptions(tags);
    // Dirty hack
    setTimeout(() => {
      setSelected([]);
    }, 200);
    setColor(defaultType);
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
    if (!highlightState) toggleHighlight(id!!, colorType);
  };

  const handleInputBlur = () => {
    if (
      !highlightState &&
      (!tagCreatedSuccessfully || selectedOptions.length === 0)
    ) {
      editor.commands.unsetTHighlight();
    }
    setTagCreatedSuccessfully(false);
  };

  const handleNewTag = (e: any) => {
    const createTag = async (newOption: { label: string }) => {
      const tagId = nanoid();
      const newTag = {
        id: tagId,
        label: newOption.label,
        color: colorType,
        projectsID: storyMetadata.projectId,
        tagCategoryID: defaultTagCategory?.id,
      };
      const option = {
        id: newTag.id,
        label: newTag.label,
        color: categoryColor,
      };

      allOptions[0].options.push(option);
      // const newOptions = [option, ...tagOptions];
      const selectedTags = [...selectedOptions, option];
      // const selectedOptions =
      setAnnotation((annotation) => {
        return {
          ...annotation,
          [id!!]: {
            type: color,
            tags: selectedTags,
          },
        } as Annotation;
      });
      // setTagOptions(tagOptions);
      setAllOptions(allOptions);
      setSelected(selectedTags);
      createTagMutation.mutate(newTag);
      if (highlightState) {
        updateHighlight(colorType, selectedTags);
      } else {
        createHighlight(id!!, colorType, [newTag.id]);
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

  const getColor = (color: string) =>
    Object.keys(HIGHLIGHT_TYPES).find(
      (highlightType) =>
        HIGHLIGHT_TYPES[highlightType as HIGHLIGHT_COLORS].color === color
    )!!;

  const handleTagsChange = async (selectedOptions: any[]) => {
    const id =
      highlightState && highlightState.id ? highlightState.id : nanoid();
    // Don't allow to delete last tag
    // if (selectedOptions.length === 0) {
    //   return;
    // }
    const tagIds = selectedOptions.map(
      (option: any) => option.id as unknown as string
    );
    const uniqueColors = new Set(selectedOptions.map((option) => option.color));
    if (uniqueColors.size > 1) {
      toggleHighlight(id, HIGHLIGHT_COLORS.MIXED);
    } else {
      toggleHighlight(
        id,
        getColor(Array.from(uniqueColors)[0]) as HIGHLIGHT_COLORS
      );
    }
    if (!highlightState) {
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
          [id]: {
            type: color,
            tags: selectedOptions,
          },
        } as Annotation;
      });
      updateHighlight(color, selectedOptions);
    }

    setSelected(selectedOptions);
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
      const id = highlightState.id;
      setAnnotation((annotation) => {
        return _.omit(annotation, id);
      });
      deleteHighlightMutation.mutateAsync({
        id,
      });
      reset();
    }
    editor.commands.unsetTHighlight();
  };

  return (
    <EuiPanel>
      <div style={POPOVER_STYLE}>
        <EuiFlexGroup direction="column" gutterSize="s">
          <EuiFlexItem>
            <EuiFlexGroup direction="column" gutterSize="l">
              <EuiFlexItem>
                <EuiFlexGroup alignItems="center" gutterSize="s">
                  <EuiFlexItem grow={false}>
                    <EuiColorPicker
                      mode="swatch"
                      swatches={swatches}
                      onChange={setCategoryColor}
                      color={categoryColor}
                      button={
                        <EuiColorPickerSwatch
                          color={categoryColor}
                          aria-label="Select a new color"
                        />
                      }
                    />
                  </EuiFlexItem>
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
                {/* <EuiSelectable
                  aria-label="Tags"
                  allowExclusions={false}
                  options={tagOptions}
                  onChange={handleTagsChange}
                  listProps={{ bordered: true }}
                >
                  {(list) => list}
                </EuiSelectable> */}
                <EuiComboBox
                  aria-label="Tags"
                  placeholder="Assign Tags"
                  options={allOptions}
                  selectedOptions={selectedOptions}
                  onFocus={handleHighlightSelection}
                  onBlur={handleInputBlur}
                  onChange={handleTagsChange}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          {/* {selectedTags.length > 0 && (
            <EuiFlexItem>
              <ColorPicker selected={color} onChange={handleColorChange} />
            </EuiFlexItem>
          )} */}
        </EuiFlexGroup>
      </div>
    </EuiPanel>
  );
};
