import {
  EuiButton,
  EuiComboBox,
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
  EuiText,
  EuiTextColor,
  htmlIdGenerator,
  useGeneratedHtmlId,
} from "@elastic/eui";
import { Editor, JSONContent } from "@tiptap/react";
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
  useHighlight,
  useUpdateHighlight,
} from "core/modules/highlights/hooks";
import { useCreateTag, useTags } from "core/modules/tags/hooks";

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
  // const { data: story } = useStory(storyId);
  // const [highlight, setHighlight] = useState<Highlight | undefined>();
  const [annotation, setAnnotation] =
    useRecoilState<Annotation>(annotationState);
  const transcriptState = useRecoilValue(transcriptAtom);
  const highlightState = useRecoilValue(highlightAtom);
  const { data: highlight } = useHighlight(highlightState?.id!!);
  const { data: tags } = useTags(storyMetadata.projectId);
  const createHighlightMutation = useCreateHighlight();
  const updateHighlightMutation = useUpdateHighlight(highlightState?.id!!);
  const createTagMutation = useCreateTag();
  const [highlightId, setHighlightId] = useState<string | null>(
    highlightState && highlightState.id
  );
  const highlightCategory = highlightState ? highlightState.type : undefined;
  const [newTag, setNewTag] = useState<string | undefined>();
  const [eg1IsOpen, setEg1IsOpen] = useState<boolean>(false);
  const [eg2IsOpen, setEg2IsOpen] = useState<boolean>(false);
  // const content =
  const transcript = editor
    .getJSON()
    .content?.filter(
      (content: JSONContent) => content.type === "transcriptComponent"
    )[0];
  //let this state be maintained by the component since later on this will be async
  const [tagOptions, setTagOptions] = useState<any[]>([]);
  //get the relevant state
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [hasTagsChanged, setHasTagsChanged] = useState(false);
  useEffect(() => () => console.log("unmount"), []);
  // useEffect(() => {
  //   if (highlight && tagOptions && tagOptions.length > 0 && highlight.tagIds) {
  //     const tags = highlight.tagIds.split("|");
  //     const selectedTags = tagOptions.map((option) => {
  //       if (tags.includes(option.id)) {
  //         option.checked = "on";
  //       }
  //       return option;
  //     });
  //     setTagOptions(tagOptions);
  //     setSelectedTags(selectedTags);
  //   }
  // }, [highlight, tagOptions]);

  useEffect(() => {
    if (tagOptions.length === 0 && tags && highlight) {
      const tagIds = highlight.tagIds ? highlight.tagIds.split("|") : [];
      const options = tags.map((option) => {
        const checked = tagIds.includes(option.id) && "on";
        return { label: option.label, id: option.id, checked };
      });
      setTagOptions(options);
    }
  }, [highlight, tagOptions, tags]);

  const saveTags = useCallback(
    async (tags: string[]) => {
      if (highlight) {
        await updateHighlightMutation.mutateAsync({
          id: highlight.id,
          tagIds: tags.join("|"),
          _version: highlight._version,
        });
      }
    },
    [highlight, updateHighlightMutation]
  );

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
  }, [hasTagsChanged, highlightOnDOM, saveTags, selectedTags]);

  const saveHighlight = async (
    text: string,
    highlightCategory: string,
    tagIds?: string[]
  ) => {
    if (highlight) {
      await updateHighlightMutation.mutateAsync({
        id: highlight.id,
        text,
        _version: highlight._version,
      });
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
        return highlight.id;
      }
    }
  };

  // const saveTags = async (tags: string[]) => {
  //   if (highlight) {
  //     await updateHighlightMutation.mutateAsync({
  //       id: highlight.id,
  //       tags,
  //     });
  //   }
  // };

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

        //get all the spans
        //@ts-ignore
        // const paragraphId = 0;
        //@ts-ignore
        const paragraphId = parseInt(
          //@ts-ignore
          range.commonAncestorContainer.id.replace("para-", "")
        );
        if (transcript) {
          const spans = Array.from(range.cloneContents().children);
          const startWordId = _.find(
            spans,
            (span) => parseInt(span.getAttribute("data-m") || "-1") >= 0
          )?.getAttribute("data-m");
          const lastWordId = _.findLast(
            spans,
            (span: any) => parseInt(span.getAttribute("data-m") || "-1") >= 0
          )?.getAttribute("data-m");
          spans[spans.length - 1].getAttribute("data-m");

          let highlightingStarted = false;
          //@ts-ignore
          const paragraph = transcript.content[paragraphId];

          // const highlight = [];
          //@ts-ignore
          // const x = paragraph.content.reduce((aggregate: any[], span: any) => {
          //   let { marks, ...word } = span;
          //   if (marks) {
          //     const mark = marks[0];
          //     const wordAttributes = mark.attrs;
          //     const wordId = wordAttributes.startTime;
          //     if (wordId === startWordId) {
          //       //highlight.push
          //       aggregate.push({
          //         type: "text",
          //         marks: [
          //           {
          //             highlightId: id || newId,
          //             highlightCategory: highlightType,
          //           },
          //         ],
          //         content: [],
          //       });
          //       // counter++;
          //       highlightingStarted = true;
          //     }
          //     if (highlightingStarted) {
          //       if (wordId === lastWordId) {
          //         highlightingStarted = false;
          //       }
          //       // if (wordId !== lastWordId) {
          //       //update attributes
          //       aggregate[aggregate.length - 1].content.push({
          //         ...word,
          //         marks: [
          //           {
          //             ...mark,
          //             attrs: {
          //               ...wordAttributes,
          //             },
          //           },
          //         ],
          //       });
          //       // } else {
          //       // aggregate.push(span)
          //       // }
          //       return aggregate;
          //       // return {
          //       //   ...word,
          //       //   marks: [
          //       //     {
          //       //       ...mark,
          //       //       attrs: {
          //       //         ...wordAttributes,
          //       //         highlightId: "123",
          //       //         highlightType: "angry",
          //       //       },
          //       //     },
          //       //   ],
          //       // };
          //     }
          //   } else {
          //     if (highlightingStarted ) {
          //       aggregate[aggregate.length - 1].content.push(span);
          //       return aggregate;
          //     }
          //   }
          //   aggregate.push(span);
          //   return aggregate;
          //   //when word id matches the start Id
          //   //add attributes to that word
          // }, []);
          const x = paragraph.content.map((span: any) => {
            let { marks, ...word } = span;
            if (marks) {
              const mark = marks[0];
              const wordAttributes = mark.attrs;
              const wordId = wordAttributes.startTime;
              if (wordId === startWordId) {
                //found the starting word
                //highlight.push
                highlightingStarted = true;
                // counter++;
              }
              if (highlightingStarted) {
                if (wordId === lastWordId) {
                  highlightingStarted = false;
                }
                return {
                  ...word,
                  marks: [
                    {
                      ...mark,
                      attrs: {
                        ...wordAttributes,
                        highlightId,
                        highlightCategory,
                      },
                    },
                  ],
                };
              }
            } else {
              // if (counter >= 0 && counter < spans.length) {
              if (highlightingStarted) {
                // counter++;
                return {
                  ...span,
                  marks: [
                    {
                      attrs: {
                        highlightId,
                        highlightCategory,
                      },
                      type: "timeOffset",
                    },
                  ],
                };
              }
            }
            return span;
          });
          const contentX = [
            ...transcript.content!!.slice(0, paragraphId),
            { ...paragraph, content: x },
            ...transcript.content!!.slice(paragraphId + 1),
          ];

          // const story = await DataStore.query(Story, storyId);
          // if (story) {
          let doc = editor.getJSON();
          //  Object.assign(
          //   {},
          //   story?.content as unknown as JSONContent
          // );
          if (doc.content) {
            let index = doc.content.findIndex(
              (content) => content.type === "transcriptComponent"
            );
            if (index && index >= 0) {
              // const updatedStory = Story.copyOf(story, (updated) => {
              //   let doc = story?.content as unknown as JSONContent;
              //   const currentValue = doc!!.content!![index];
              //   // doc.content!![index].content = content.content as JSONContent[];
              //   //@ts-ignore
              //   updated.content = {
              //   };
              // });
              // let doc = story?.content as unknown as JSONContent;
              const currentValue = doc!!.content!![index];
              editor.commands.setContent(
                {
                  type: "doc",
                  content: Object.assign([], doc.content, {
                    [index]: { ...currentValue, content: contentX },
                  }),
                },
                true
              );
              // await DataStore.save(updatedStory);
              // doc.content[index].content = content.content as JSONContent[];
            }
          }
          // }
          // setTranscript({
          //   ...transcript,
          //   content: contentX,
          // });
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
        }
        return highlightId;
        //convert the spans into marks
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
    //   if (newTag) {
    //     const option = { label: newTag.label, id: newTag.id };
    //     setTagOptions([...tagOptions, option]);
    //     setSelectedTags([...selectedTags, option]);
    //     if (highlightId) {
    //       //update the relation model
    //       await API.graphql({
    //         query: createHighlightTags,
    //         variables: {
    //           input: {
    //             highlightsID: highlightId,
    //             tagsID: option.id,
    //           } as CreateHighlightTagsInput,
    //         },
    //         authMode: "AMAZON_COGNITO_USER_POOLS",
    //       });
    //       setAnnotation({
    //         ...annotation,
    //         [highlightId]: {
    //           type: highlightCategory,
    //           tags: [...selectedTags, option],
    //         },
    //       });
    //     }
    //   }
    // };
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

    // if (highlightId) {
    //   createTagMutation.mutateAsync({
    //     label: newOption.label,
    //     projectsID: storyMetadata.projectId,
    //   });
    //   setAnnotation({
    //     ...annotation,
    //     [highlightId]: {
    //       type: highlightCategory,
    //       tags: [...selectedTags, newOption],
    //     },
    //   });
    // }

    // Select the option.
  };

  const handleTagsChange = (newOptions: any[]) => {
    const selectedOptions = newOptions.filter(
      (option) => option.checked && option.checked === "on"
    );
    if (highlight?.id) {
      // const highlightId = toggleHighlight()
    } else {
    }
    setSelectedTags(selectedOptions);
    setTagOptions(newOptions);
    setHasTagsChanged(true);
    if (highlight?.id && highlightCategory) {
      setAnnotation({
        ...annotation,
        [highlight.id]: {
          type: highlightCategory,
          tags: selectedOptions,
        },
      });
    }
    // highlightOnDOM();
    // editor
    //   .chain()
    //   .focus()
    //   .setHighlight({
    //     id: id || newId,
    //     color: HIGHLIGHT_TYPES[highlight].color,
    //     type: highlight,
    //   })
    //   .run();
    //clear existing relationships
    //get all existing by highlights id
    //if existing has an id that doesn't exist in current
    //delete it
    //get new elements to be added
    // create new highlight
    // await API.graphql({
    //   query: createHighlightTags,
    //   variables: {
    //     input: {
    //       highlightsID: highlightId,
    //       tagsID: option.id,
    //     },
    //   },
    //   authMode: "AMAZON_COGNITO_USER_POOLS",
    // });
    // syncRelationship(
    //   highlightId,
    //   new Set(
    //     selectedOptions.map((option: any) => option.id as unknown as string)
    //   )
    // );
  };

  const [example2, setExample2] = useState<{
    value: number | string;
    description: string;
    isOpen?: boolean;
  }>({
    value: 100,
    description: "Is above",
  });

  const expressionPopoverId__1 = useGeneratedHtmlId({
    prefix: "expressionPopover",
    suffix: "first",
  });
  const expressionPopoverId__2 = useGeneratedHtmlId({
    prefix: "expressionPopover",
    suffix: "second",
  });

  const openExample1 = () => {
    setEg1IsOpen(true);
    setEg2IsOpen(false);
  };

  const closeExample1 = () => {
    setEg1IsOpen(false);
  };

  const openExample2 = () => {
    setEg1IsOpen(false);
    setEg2IsOpen(true);
  };

  const closeExample2 = () => {
    setEg2IsOpen(false);
  };

  const onHighlightChange = (value: string) => {
    toggleHighlight(value);
    // editor
    //   .chain()
    //   .focus()
    //   .setHighlight({
    //     id: id || newId,
    //     color: HIGHLIGHT_TYPES[value].color,
    //     type: value,
    //   })
    //   .run();
    // if (highlightId) {
    //   setAnnotation({
    //     ...annotation,
    //     [highlightId]: {
    //       type: value,
    //       tags: selectedTags,
    //     },
    //   });
    // }
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
    // setAnnotation({
    //   ...annotation,
    //   [id || newId]: {
    //     type: highlight,
    //     tags: selectedTags,
    //   },
    // });
    // setSelectedTags([]);
  };

  const handleDeleteHighlight = () => {
    // const range = highlightOnDOM();
    // if (window) {
    const selection = window.getSelection();
    const range = selection ? selection.getRangeAt(0) : highlightOnDOM();

    const paragraphId = parseInt(
      //@ts-ignore
      range.commonAncestorContainer.id.replace("para-", "")
    );
    if (transcript) {
      const spans = Array.from(range.cloneContents().children);
      const startWordId = _.find(
        spans,
        (span) => parseInt(span.getAttribute("data-m") || "-1") >= 0
      )?.getAttribute("data-m");
      const lastWordId = _.findLast(
        spans,
        (span: any) => parseInt(span.getAttribute("data-m") || "-1") >= 0
      )?.getAttribute("data-m");
      spans[spans.length - 1].getAttribute("data-m");

      let highlightingStarted = false;
      //@ts-ignore
      const paragraph = transcript.content[paragraphId];
      //@ts-ignore
      const x = paragraph.content.map((span: any) => {
        let { marks, ...word } = span;
        if (marks) {
          const mark = marks[0];
          const wordAttributes = mark.attrs;
          const wordId = wordAttributes.startTime;
          if (wordId === startWordId) {
            highlightingStarted = true;
          }
          if (highlightingStarted) {
            if (wordId === lastWordId) {
              highlightingStarted = false;
            }
            return {
              ...word,
              marks: [
                {
                  ...mark,
                  attrs: {
                    ...wordAttributes,
                    highlightId: undefined,
                    highlightCategory: undefined,
                  },
                },
              ],
            };
          }
        } else {
          // if (counter >= 0 && counter < spans.length) {
          if (highlightingStarted) {
            // counter++;
            return {
              ...span,
              marks: [
                {
                  attrs: {
                    highlightId: undefined,
                    highlightCategory: undefined,
                  },
                  type: "timeOffset",
                },
              ],
            };
          }
        }
        return span;
      });
      const contentX = [
        ...transcript.content!!.slice(0, paragraphId),
        { ...paragraph, content: x },
        ...transcript.content!!.slice(paragraphId + 1),
      ];

      let doc = editor.getJSON();
      if (doc.content) {
        let index = doc.content.findIndex(
          (content) => content.type === "transcriptComponent"
        );
        if (index && index >= 0) {
          const currentValue = doc!!.content!![index];
          editor.commands.setContent(
            {
              type: "doc",
              content: Object.assign([], doc.content, {
                [index]: { ...currentValue, content: contentX },
              }),
            },
            true
          );
        }
      }
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
    }
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
              valueOfSelected={highlightCategory}
              onChange={onHighlightChange}
            />
          </EuiFlexItem>
          {highlightCategory && (
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
