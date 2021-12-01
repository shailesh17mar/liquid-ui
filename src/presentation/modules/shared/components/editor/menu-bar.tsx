import {
  EuiButtonGroup,
  useGeneratedHtmlId,
  EuiFlexGroup,
  htmlIdGenerator,
  EuiFlexItem,
  EuiButtonIcon,
} from "@elastic/eui";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { MenuButton, vr } from "./menu-bar.styles";

interface MenuBarProps {
  editor: Editor | null;
}
export const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  const idPrefix3 = htmlIdGenerator()();
  const idHeadingPrefix = htmlIdGenerator()();
  const idAssetPrefix = htmlIdGenerator()();
  const multiSelectButtonGroupPrefix = useGeneratedHtmlId({
    prefix: "multiSelectButtonGroup",
  });

  const headingButtonIcons = [
    {
      id: `${idHeadingPrefix}0`,
      label: "H1",
    },
    {
      id: `${idHeadingPrefix}1`,
      label: "H2",
    },
    {
      id: `${idHeadingPrefix}2`,
      label: "H3",
    },
  ];

  const toggleButtonsIcons = [
    {
      id: `${idPrefix3}0`,
      label: "Ordered List",
      iconType: "editorOrderedList",
    },
    {
      id: `${idPrefix3}1`,
      label: "Unordered List",
      iconType: "editorUnorderedList",
    },
    {
      id: `${idPrefix3}2`,
      label: "Todo List",
      iconType: "checkInCircleFilled",
    },
  ];

  const toggleAssetIcons = [
    {
      id: `${idAssetPrefix}0`,
      label: "Image",
      iconType: "image",
    },
    {
      id: `${idAssetPrefix}1`,
      label: "Video",
      iconType: "videoPlayer",
    },
    {
      id: `${idAssetPrefix}2`,
      label: "Attachment",
      iconType: "paperClip",
    },
  ];

  const [toggleIconIdSelected, setToggleIconIdSelected] = useState(
    `${idPrefix3}1`
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
  if (!editor) {
    return null;
  }
  return (
    <EuiFlexGroup gutterSize="xs">
      <EuiFlexItem grow={false}>
        <MenuButton
          color="text"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          size="s"
          isSelected={editor.isActive("heading", { level: 1 })}
          aria-label="Heading 1"
        >
          H1
        </MenuButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <MenuButton
          size="s"
          color="text"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isSelected={editor.isActive("heading", { level: 2 })}
          aria-label="Heading 2"
        >
          H2
        </MenuButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <MenuButton
          color="text"
          size="s"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isSelected={editor.isActive("heading", { level: 3 })}
          aria-label="Heading 3"
        >
          H3
        </MenuButton>
      </EuiFlexItem>
      &nbsp;&nbsp;
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          color="text"
          iconType="editorBold"
          iconSize="l"
          display="base"
          size="s"
          onClick={() => editor.chain().focus().toggleBold().run()}
          isSelected={editor.isActive("bold")}
          aria-label="Bold"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          color="text"
          iconSize="l"
          display="base"
          iconType="editorItalic"
          size="s"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isSelected={editor.isActive("italic")}
          aria-label="Italic"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          color="text"
          iconSize="l"
          display="base"
          iconType="editorUnderline"
          size="s"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isSelected={editor.isActive("underline")}
          aria-label="Underline"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          color="text"
          iconType="editorStrike"
          iconSize="l"
          display="base"
          size="s"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isSelected={editor.isActive("strike")}
          aria-label="Strike through"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          color="text"
          iconType="quote"
          iconSize="l"
          display="base"
          size="s"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isSelected={editor.isActive("blockquote")}
          aria-label="Block Quote"
        />
      </EuiFlexItem>
      &nbsp;&nbsp;
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          color="text"
          iconType="editorOrderedList"
          iconSize="l"
          display="base"
          size="s"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isSelected={editor.isActive("orderedList")}
          aria-label="Numbered List"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          color="text"
          iconType="editorUnorderedList"
          iconSize="l"
          display="base"
          size="s"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isSelected={editor.isActive("bulletList")}
          aria-label="Bulleted List"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          color="text"
          iconType="checkInCircleFilled"
          iconSize="l"
          display="base"
          size="s"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          isSelected={editor.isActive("taskList")}
          aria-label="Task List"
        />
      </EuiFlexItem>
     &nbsp;&nbsp; 
      <EuiFlexItem grow={false}>
        <EuiButtonGroup
          legend="Attachments"
          options={toggleAssetIcons}
          idSelected={toggleIconIdSelected}
          onChange={(id) => onChangeIcons(id)}
          isIconOnly
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
