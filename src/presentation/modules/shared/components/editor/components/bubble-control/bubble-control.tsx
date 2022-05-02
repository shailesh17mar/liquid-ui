import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  useGeneratedHtmlId,
} from "@elastic/eui";
import React from "react";

import { EuiPanel } from "@elastic/eui";
import { Editor } from "@tiptap/react";

import {
  AiOutlineInsertRowAbove,
  AiOutlineInsertRowBelow,
  AiOutlineInsertRowLeft,
  AiOutlineInsertRowRight,
  AiOutlineDeleteColumn,
  AiOutlineDeleteRow,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsToggleOff } from "react-icons/bs";

interface Props {
  editor: Editor;
}
export const BubbleControl: React.FC<Props> = ({ editor }) => {
  const multiSelectButtonGroupPrefix = useGeneratedHtmlId({
    prefix: "multiSelectButtonGroup",
  });

  const buttons = [
    {
      iconType: AiOutlineInsertRowBelow,
      "aria-label": "Insert row below",
      isDisabled: !editor.can().addRowAfter(),
      onClick: () => editor.chain().focus().addRowAfter().run(),
    },
    {
      iconType: AiOutlineInsertRowAbove,
      "aria-label": "Insert row above",
      isDisabled: !editor.can().addRowBefore(),
      onClick: () => editor.chain().focus().addRowBefore().run(),
    },
    {
      iconType: AiOutlineDeleteRow,
      "aria-label": "Delete row",
      color: "danger",
      isDisabled: !editor.can().deleteRow(),
      onClick: () => editor.chain().focus().deleteRow().run(),
    },
    {
      iconType: AiOutlineInsertRowRight,
      "aria-label": "Insert column after",
      isDisabled: !editor.can().addColumnAfter(),
      onClick: () => editor.chain().focus().addColumnAfter().run(),
    },
    {
      iconType: AiOutlineInsertRowLeft,
      "aria-label": "Insert column before",
      isDisabled: !editor.can().addColumnBefore(),
      onClick: () => editor.chain().focus().addColumnBefore().run(),
    },
    {
      iconType: AiOutlineDeleteColumn,
      "aria-label": "Delete column",
      color: "danger",
      isDisabled: !editor.can().deleteColumn(),
      onClick: () => editor.chain().focus().deleteColumn().run(),
    },
    {
      iconType: BsToggleOff,
      "aria-label": "Toggle header row",
      isDisabled: !editor.can().toggleHeaderRow(),
      onClick: () => editor.chain().focus().toggleHeaderRow().run(),
    },
    {
      iconType: AiOutlineDelete,
      "aria-label": "Delete table",
      color: "danger",
      isDisabled: !editor.can().deleteTable(),
      onClick: () => editor.chain().focus().deleteTable().run(),
    },
  ] as any[];

  return (
    <EuiPanel style={{ minWidth: 400 }} paddingSize="s">
      <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
        {buttons.map((buttonProps, index) => (
          <EuiFlexItem
            key={`${multiSelectButtonGroupPrefix}_${index}`}
            grow={false}
          >
            <EuiButtonIcon size="m" {...buttonProps} />
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
    </EuiPanel>
  );
};
