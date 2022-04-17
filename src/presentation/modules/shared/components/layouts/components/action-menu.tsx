import {
  EuiPopover,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  useGeneratedHtmlId,
} from "@elastic/eui";
import { useState } from "react";
import { HeaderActionButton } from "../layout.styles";

interface Props {
  onAddProject: () => void;
}
export const ActionMenu: React.FC<Props> = ({ onAddProject }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const actionsContextMenuPopoverId = useGeneratedHtmlId({
    prefix: "actionsContextMenuPopover",
  });

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };
  const items = [
    <EuiContextMenuItem
      aria-label="Project"
      icon="folderClosed"
      key="project"
      onClick={() => {
        handleClosePopover();
        onAddProject();
      }}
    >
      Project
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      aria-label="Users"
      icon="users"
      key="users"
      onClick={handleClosePopover}
    >
      Invite
    </EuiContextMenuItem>,
  ];
  return (
    <EuiPopover
      id={actionsContextMenuPopoverId}
      button={
        <HeaderActionButton
          aria-label="Action Menu"
          iconType="plus"
          size="s"
          fill
          color="primary"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          Create new
        </HeaderActionButton>
      }
      isOpen={isPopoverOpen}
      closePopover={handleClosePopover}
      panelPaddingSize="none"
    >
      <EuiContextMenuPanel style={{ width: 150 }} size="m" items={items} />
    </EuiPopover>
  );
};
