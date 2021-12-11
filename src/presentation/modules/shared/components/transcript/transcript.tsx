import { NodeViewProps } from "@tiptap/react";
import {
  Color,
  ShortcutKey,
  TranscriptContainer,
  TranscriptContent,
} from "./transcript.styles";
import { useHighlight } from "./hooks/use-highlight";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiPopover,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import { useEffect, useState } from "react";

export const Transcript = (props: NodeViewProps) => {
  const { highlights } = useHighlight(props.editor);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(true);

  const closePopover = () => setIsPopoverOpen(false);

  const handleClickOnContent = (e: MouseEvent) => {
    if (
      e.target instanceof Element &&
      e.target.tagName.toLowerCase() === "mark"
    ) {
      // props.editor.chain().focus().unsetHighlight().run();
      let range = document.createRange();
      range.selectNodeContents(e.target);
      // const highlight = highlights[e.target.id];

      // range.setStart(highlight.startNode, highlight.startOffset);
      // range.setEnd(highlight.endNode, highlight.endOffset);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
  };

  return (
    <TranscriptContainer>
      <EuiTitle>
        <h3>Transcript</h3>
      </EuiTitle>
      <EuiPopover
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        anchorPosition="upRight"
        panelPaddingSize="none"
        hasArrow={false}
        style={{
          position: "fixed",
          bottom: "0%",
          left: "300",
          border: "none",
          transform: "translate(-50px, -50%)",
        }}
      >
        <EuiPanel hasBorder={false} hasShadow={false} style={{ width: 400 }}>
          <EuiFlexGroup direction="column">
            <EuiFlexItem>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiText>Highlight selection</EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <ShortcutKey color="text">Space</ShortcutKey>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiText>Select sentence</EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <ShortcutKey>s</ShortcutKey>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiText>Select word</EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <ShortcutKey color="text">w</ShortcutKey>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiText>Select paragraph</EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <ShortcutKey color="text">p</ShortcutKey>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiText>Unset Highlight</EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <ShortcutKey color="text">d</ShortcutKey>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiText>Select previous sentence</EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <ShortcutKey color="text">S</ShortcutKey>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiText>Select previous word</EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <ShortcutKey color="text">W</ShortcutKey>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiText>Select previous paragraph</EuiText>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <ShortcutKey color="text">P</ShortcutKey>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      </EuiPopover>
      <TranscriptContent
        className="content"
        contentEditable={false}
        onClick={handleClickOnContent}
      />
    </TranscriptContainer>
  );
};
