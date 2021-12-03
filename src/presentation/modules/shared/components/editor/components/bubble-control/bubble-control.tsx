import {
  EuiButtonIcon,
  EuiColorPicker,
  EuiColorPickerSwatch,
  EuiFlexGroup,
  EuiFlexItem,
  euiPaletteColorBlind,
  useGeneratedHtmlId,
} from "@elastic/eui";
import React from "react";

import { EuiPanel } from "@elastic/eui";
import { Editor } from "@tiptap/react";
import { EuiColorPickerOutput } from "@elastic/eui/src/components/color_picker/color_picker";

interface Props {
  editor: Editor;
}
export const BubbleControl: React.FC<Props> = ({ editor }) => {
  const multiSelectButtonGroupPrefix = useGeneratedHtmlId({
    prefix: "multiSelectButtonGroup",
  });

  const color: string = editor.getAttributes("textStyle").color || "#000";
  const buttons = [
    {
      iconType: "editorBold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      isSelected: editor.isActive("bold"),
    },
    {
      iconType: "editorItalic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isSelected: editor.isActive("italic"),
    },
    {
      iconType: "editorUnderline",
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isSelected: editor.isActive("underline"),
    },
    {
      iconType: "editorStrike",
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isSelected: editor.isActive("strike"),
    },
  ];

  return (
    <EuiPanel paddingSize="s">
      <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
        {buttons.map((buttonProps, index) => (
          <EuiFlexItem
            key={`${multiSelectButtonGroupPrefix}_${index}`}
            grow={false}
          >
            <EuiButtonIcon {...buttonProps} />
          </EuiFlexItem>
        ))}
        <EuiFlexItem>
          <EuiColorPicker
            button={
              <EuiColorPickerSwatch
                color={color}
                aria-label="Select a new color"
              />
            }
            mode="swatch"
            swatches={euiPaletteColorBlind({ sortBy: "natural" })}
            onChange={(text: string, output: EuiColorPickerOutput) => {
              editor.chain().focus().setColor(text).run();
            }}
            color={color}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};
