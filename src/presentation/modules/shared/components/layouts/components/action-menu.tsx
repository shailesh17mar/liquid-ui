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
      icon="folderClosed"
      key="project"
      onClick={() => {
        handleClosePopover();
        onAddProject();
      }}
    >
      Project
    </EuiContextMenuItem>,
    <EuiContextMenuItem icon="users" key="users" onClick={handleClosePopover}>
      Invite
    </EuiContextMenuItem>,
  ];
  return (
    <EuiPopover
      id={actionsContextMenuPopoverId}
      button={
        <HeaderActionButton
          display="fill"
          iconType="plus"
          color="primary"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        />
      }
      isOpen={isPopoverOpen}
      anchorPosition="downRight"
      closePopover={handleClosePopover}
      panelPaddingSize="none"
    >
      <EuiContextMenuPanel style={{ width: 150 }} size="m" items={items} />
    </EuiPopover>
  );
};