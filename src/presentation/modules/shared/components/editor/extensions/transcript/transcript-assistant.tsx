import {
  EuiPopover,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from "@elastic/eui";
import { ShortcutKey } from "./transcript.styles";

interface AssistantProps {
  isOpen: boolean;
  onClose: () => void;
}
export const TranscriptAssistant: React.FC<AssistantProps> = ({
  isOpen,
  onClose,
}) => (
  <EuiPopover
    isOpen={isOpen}
    closePopover={onClose}
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
);
