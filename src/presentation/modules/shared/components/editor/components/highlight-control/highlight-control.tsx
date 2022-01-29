import {
  EuiBadge,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiExpression,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHealth,
  EuiPanel,
  EuiPopover,
  EuiSuperSelect,
  htmlIdGenerator,
  useGeneratedHtmlId,
} from "@elastic/eui";
import { Editor, generateJSON, JSONContent } from "@tiptap/react";
import { DataStore } from "aws-amplify";
import { Stories as Story, Highlights as Highlight, Tags as Tag } from "models";
import _ from "lodash";
import {
  Annotation,
  annotationState,
} from "main/pages/make-story-details-page";
import { useEffect, useRef, useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { transcriptAtom } from "../../extensions/transcript/transcript";
import { useParams } from "react-router-dom";
import { ModelInit, MutableModel } from "@aws-amplify/datastore";
import { useStoryMetadata } from "presentation/modules/stories/story-context";
import { HighlightTags } from "models";

interface Props {
  id?: string;
  editor: Editor;
}

const POPOVER_STYLE = { zIndex: 200, minWidth: 300 };
const COMBO_POPOVER_STYLE = { zIndex: 200, minWidth: 500 };

const HIGHLIGHT_TYPES: { [key: string]: { color: string; label: string } } = {
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
    label: "☇ Pain or Problem",
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
    label: "^ Background or context",
  },
  money: {
    color: "#178117",
    label: "＄ Money or budgets or purchasing process",
  },
  feature: {
    color: "#e8eaed",
    label: "☑ Feature request or purchasing criteria",
  },
  entity: {
    color: "#cbf0f8",
    label: "♀ Mentioned a specific person or company",
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
  const [highlight, setHighlight] = useState<Highlight | undefined>();
  const [annotation, setAnnotation] =
    useRecoilState<Annotation>(annotationState);
  const transcriptState = useRecoilValue(transcriptAtom);
  const highlightState = useRecoilValue(highlightAtom);
  const [highlightId, setHighlightId] = useState<string | null>(
    highlightState && highlightState.id
  );
  const highlightCategory = highlightState ? highlightState.type : defaultType;
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
  useEffect(() => {
    if (highlightId) {
      setSelectedTags(
        highlightState && annotation[highlightId]
          ? annotation[highlightId].tags
          : []
      );
    }
  }, [annotation, highlightState, highlightId]);

  useEffect(() => {
    async function fetchHighlight() {
      if (highlightState?.id) {
        const highlight = await DataStore.query(Highlight, highlightState.id);
        setHighlight(highlight);
      }
    }
    fetchHighlight();
  }, [highlightState?.id]);

  useEffect(() => {
    async function fetchTagsInProject() {
      if (storyMetadata.projectId) {
        const tags = await DataStore.query(Tag, (tag) =>
          tag.projectsID("eq", storyMetadata.projectId)
        );
        setTagOptions(tags);
      }
    }
    fetchTagsInProject();
  }, [storyMetadata.projectId, highlightState?.id]);

  useEffect(() => {
    if (selectedTags && highlightState?.id) {
      //delete all existing relations of highlight
      // DataStore.delete(HighlightTags, (tag) =>
      //     tag.highlights("eq", highlightState?.id))
      //create new relations
    }
  }, [highlightState?.id, selectedTags]);
  const saveHighlight = async (text: string, highlightCategory: string) => {
    if (highlight) {
      await DataStore.save(
        Highlight.copyOf(highlight, (updated) => {
          updated.text = text;
        })
      );
      return highlight.id;
    } else {
      const transcriptionID = highlightState?.transcriptionId!!;
      const highlight = await DataStore.save(
        new Highlight({
          text,
          type: highlightCategory,
          transcriptionID,
          projectsID: storyMetadata.projectId,
        })
      );
      setHighlightId(highlight.id);
      return highlight.id;
    }
  };

  const toggleHighlight = async (highlightCategory: string) => {
    if (window) {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        const text = range.toString();
        const highlightId = await saveHighlight(text, highlightCategory);

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

          const story = await DataStore.query(Story, storyId);
          if (story) {
            let doc = Object.assign(
              {},
              story?.content as unknown as JSONContent
            );
            if (doc.content) {
              let index = doc.content.findIndex(
                (content) => content.type === "transcriptComponent"
              );
              if (index && index >= 0) {
                // const updatedStory = Story.copyOf(story, (updated) => {
                //   let doc = story?.content as unknown as JSONContent;
                //   const currentValue = doc!!.content!![index];
                //   // doc.content!![index].content = content.content as JSONContent[];
                //   debugger;
                //   //@ts-ignore
                //   updated.content = {
                //   };
                // });
                let doc = story?.content as unknown as JSONContent;
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
                // console.log(updatedStory);
                // doc.content[index].content = content.content as JSONContent[];
              }
            }
          }
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
        //convert the spans into marks
      }
    }
  };

  const handleTagCreate = (
    searchValue: string,
    flattenedOptions: EuiComboBoxOptionOption[] = []
  ) => {
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
      setTagOptions([...tagOptions, newOption]);
    }

    setSelectedTags([...selectedTags, newOption]);
    // editor
    //   .chain()
    //   .focus()
    //   .setHighlight({
    //     id: id || newId,
    //     color: HIGHLIGHT_TYPES[highlight].color,
    //     type: highlight,
    //   })
    //   .run();
    if (highlightId) {
      DataStore.save(
        new Tag({
          label: newOption.label,
          projectsID: storyMetadata.projectId,
          // highlightsID: highlightId,
        })
      );

      setAnnotation({
        ...annotation,
        [highlightId]: {
          type: highlightCategory,
          tags: [...selectedTags, newOption],
        },
      });
    }

    // Select the option.
  };

  const handleTagsChange = (selectedOptions: any[]) => {
    toggleHighlight(highlightCategory);
    // editor
    //   .chain()
    //   .focus()
    //   .setHighlight({
    //     id: id || newId,
    //     color: HIGHLIGHT_TYPES[highlight].color,
    //     type: highlight,
    //   })
    //   .run();
    setSelectedTags(selectedOptions);
    if (highlightId) {
      setAnnotation({
        ...annotation,
        [highlightId]: {
          type: highlightCategory,
          tags: selectedOptions,
        },
      });
    }
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

  const renderPopover1 = () => (
    <div style={POPOVER_STYLE}>
      <EuiSuperSelect
        options={options}
        valueOfSelected={highlightCategory}
        onChange={onHighlightChange}
      />
    </div>
  );

  const renderPopover2 = () => (
    <div style={COMBO_POPOVER_STYLE}>
      <EuiComboBox
        aria-label="Accessible screen reader label"
        fullWidth
        placeholder="Select or create options"
        options={tagOptions}
        selectedOptions={selectedTags}
        onChange={handleTagsChange}
        onCreateOption={handleTagCreate}
        isClearable={true}
        data-test-subj="demoComboBox"
        autoFocus
        onBlur={onBlur}
      />
    </div>
  );

  const onBlur = () => {
    // setAnnotation({
    //   ...annotation,
    //   [id || newId]: {
    //     type: highlight,
    //     tags: selectedTags,
    //   },
    // });
    // setSelectedTags([]);
  };

  return (
    <EuiPanel style={{ minWidth: 900 }}>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem grow={false}>
          {/* <EuiPopover
            id={expressionPopoverId__1}
            button={
              <EuiExpression
                description="highlight as"
                value={highlight}
                isActive={eg1IsOpen}
                onClick={openExample1}
              />
            }
            isOpen={eg1IsOpen}
            closePopover={closeExample1}
            anchorPosition="upRight"
          >
            {renderPopover1()}
          </EuiPopover> */}
          {renderPopover1()}
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          {renderPopover2()}
          {/* <EuiPopover
            id={expressionPopoverId__2}
            button={
              <EuiExpression
                description={"and apply tags"}
                value={selectedTags.map((value, index) => (
                  <EuiBadge key={index} color="hollow">
                    {value.label}
                  </EuiBadge>
                ))}
                isActive={eg2IsOpen}
                onClick={openExample2}
              />
            }
            isOpen={eg2IsOpen}
            closePopover={closeExample2}
            anchorPosition="downLeft"
          >
            {renderPopover2()}
          </EuiPopover> */}
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};
