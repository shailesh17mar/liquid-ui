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
import { Editor } from "@tiptap/react";
import { Annotation, annotationState } from "main/pages/make-storydetails-page";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

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
export const HighlightControl: React.FC<Props> = ({ editor, id }) => {
  const newId = htmlIdGenerator()();
  const [annotation, setAnnotation] =
    useRecoilState<Annotation>(annotationState);
  const highlight = id && annotation[id] ? annotation[id].type : defaultType;
  const [eg1IsOpen, setEg1IsOpen] = useState<boolean>(false);
  const [eg2IsOpen, setEg2IsOpen] = useState<boolean>(false);
  //let this state be maintained by the component since later on this will be async
  const [tagOptions, setTagOptions] = useState<any[]>([]);
  //get the relevant state
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  useEffect(() => {
    setSelectedTags(id && annotation[id] ? annotation[id].tags : []);
  }, [annotation, id]);

  const onCreateOption = (
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
    editor
      .chain()
      .focus()
      .setHighlight({
        id: id || newId,
        color: HIGHLIGHT_TYPES[highlight].color,
        type: highlight,
      })
      .run();
    setAnnotation({
      ...annotation,
      [id ? id : newId]: {
        type: highlight,
        tags: [...selectedTags, newOption],
      },
    });

    // Select the option.
  };

  const onChange = (selectedOptions: any[]) => {
    editor
      .chain()
      .focus()
      .setHighlight({
        id: id || newId,
        color: HIGHLIGHT_TYPES[highlight].color,
        type: highlight,
      })
      .run();
    setSelectedTags(selectedOptions);
    setAnnotation({
      ...annotation,
      [id ? id : newId]: {
        type: highlight,
        tags: selectedOptions,
      },
    });
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
    // setHighlight(value);
    editor
      .chain()
      .focus()
      .setHighlight({
        id: id || newId,
        color: HIGHLIGHT_TYPES[value].color,
        type: value,
      })
      .run();
    setAnnotation({
      ...annotation,
      [id || newId]: {
        type: value,
        tags: selectedTags,
      },
    });
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
        valueOfSelected={highlight}
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
        onChange={onChange}
        onCreateOption={onCreateOption}
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
