import { EuiFlexGroup, EuiFlexItem, EuiPanel } from "@elastic/eui";
import { Editor } from "@tiptap/react";
import { Color } from "../../../transcript/transcript.styles";

interface Props {
  editor: Editor;
}
export const ColorControl: React.FC<Props> = ({ editor }) => {
  const colors = [
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#cbf0f8",
    "#aecbfa",
    "#178117",
    "#d7aefb",
    "#fdcfe8",
    "#e6c9a8",
    "#e8eaed",
  ];

  return (
    <EuiPanel paddingSize="s">
      <EuiFlexGroup gutterSize="xs">
        {colors.map((color, index) => (
          <EuiFlexItem grow={false} key={index}>
            <Color
              onClick={() => {
                editor.chain().focus().toggleHighlight({ color }).run();
              }}
              className={
                editor.isActive("highlight", { color }) ? "selected" : ""
              }
              value={color}
            />
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
    </EuiPanel>
  );
};
