import {
  EuiButtonGroup,
  useGeneratedHtmlId,
  EuiFlexGroup,
  htmlIdGenerator,
  EuiFlexItem,
} from "@elastic/eui";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { PropertiesEditor } from "../shared/components/property-editor/property-editor";
import { EuiText } from "@elastic/eui/src/components/text/text";

const CustomDocument = Document.extend({
  content: "heading block*",
});
export const ProjectDetails: React.FC = () => {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
      }),
    ],
    content: `
      <h1>
        It’ll always have a heading …
      </h1>
      <p>
        … if you pass a custom document. That’s the beauty of having full control over the schema.
      </p>
    `,
  });

  const idPrefix3 = htmlIdGenerator()();
  const compressedToggleButtonGroupPrefix = useGeneratedHtmlId({
    prefix: "compressedToggleButtonGroup",
  });
  const multiSelectButtonGroupPrefix = useGeneratedHtmlId({
    prefix: "multiSelectButtonGroup",
  });

  const toggleButtonsIcons = [
    {
      id: `${idPrefix3}0`,
      label: "Align left",
      iconType: "editorAlignLeft",
    },
    {
      id: `${idPrefix3}1`,
      label: "Align center",
      iconType: "editorAlignCenter",
    },
    {
      id: `${idPrefix3}2`,
      label: "Align right",
      iconType: "editorAlignRight",
      isDisabled: true,
    },
  ];

  const toggleButtonsIconsMulti = [
    {
      id: `${multiSelectButtonGroupPrefix}__0`,
      label: "Bold",
      name: "bold",
      iconType: "editorBold",
    },
    {
      id: `${multiSelectButtonGroupPrefix}__1`,
      label: "Italic",
      name: "italic",
      iconType: "editorItalic",
      isDisabled: true,
    },
    {
      id: `${multiSelectButtonGroupPrefix}__2`,
      label: "Underline",
      name: "underline",
      iconType: "editorUnderline",
    },
    {
      id: `${multiSelectButtonGroupPrefix}__3`,
      label: "Strikethrough",
      name: "strikethrough",
      iconType: "editorStrike",
    },
  ];

  const [toggleIconIdSelected, setToggleIconIdSelected] = useState(
    `${idPrefix3}1`
  );
  const [toggleIconIdToSelectedMap, setToggleIconIdToSelectedMap] = useState(
    {}
  );

  const onChangeIcons = (optionId: string) => {
    setToggleIconIdSelected(optionId);
  };
  const [toggleIconIdToSelectedMapIcon, setToggleIconIdToSelectedMapIcon] =
    useState<{ [key: string]: boolean }>({});

  const onChangeIconsMultiIcons = (optionId: string) => {
    const newToggleIconIdToSelectedMapIcon = {
      ...toggleIconIdToSelectedMapIcon,
      ...{
        [optionId]: !toggleIconIdToSelectedMapIcon[optionId],
      },
    };

    setToggleIconIdToSelectedMapIcon(newToggleIconIdToSelectedMapIcon);
  };
  return (
    <EuiFlexGroup
      style={{ width: 900, margin: "0 auto" }}
      justifyContent="spaceAround"
      direction="column"
    >
      <EuiFlexItem>
        <EuiFlexGroup justifyContent="center">
          {/* <EuiButtonGroup
              legend="Text align"
              options={toggleButtonsIcons}
              idSelected={toggleIconIdSelected}
              onChange={(id) => onChangeIcons(id)}
              isIconOnly
            />
            &nbsp;&nbsp;
            <EuiButtonGroup
              legend="Text style"
              className="eui-displayInlineBlock"
              options={toggleButtonsIconsMulti}
              idToSelectedMap={toggleIconIdToSelectedMapIcon}
              onChange={(id) => onChangeIconsMultiIcons(id)}
              type="multi"
              isIconOnly
            /> */}
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem>
            <PropertiesEditor />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem grow={false}>
            {/* <EditorContent editor={editor} /> */}
          </EuiFlexItem>
          <EuiFlexItem grow={false}></EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
