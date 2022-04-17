import {
  EuiPopover,
  EuiButtonEmpty,
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiLink,
  useGeneratedHtmlId,
} from "@elastic/eui";
import { useAuth } from "presentation/context/auth-context";
import { useState } from "react";

export const UserMenu: React.FC = () => {
  const { signOut, user } = useAuth();
  const handleSignOut = () => {
    signOut();
  };
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const profileContextMenuPopoverId = useGeneratedHtmlId({
    prefix: "profileContextMenuPopover",
  });

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };
  return (
    <EuiPopover
      id={profileContextMenuPopoverId}
      button={
        <EuiButtonEmpty
          onClick={() => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen)}
        >
          <EuiAvatar name={user.name}></EuiAvatar>
        </EuiButtonEmpty>
      }
      isOpen={isPopoverOpen}
      anchorPosition="downRight"
      closePopover={handleClosePopover}
      panelPaddingSize="none"
    >
      <div style={{ width: 320 }}>
        <EuiFlexGroup
          gutterSize="m"
          className="euiHeaderProfile"
          responsive={false}
        >
          <EuiFlexItem grow={false}>
            <EuiAvatar color="plain" name={user.name} size="xl" />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText>
              <p>{user.name}</p>
            </EuiText>

            <EuiSpacer size="m" />

            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <EuiLink>Edit profile</EuiLink>
                  </EuiFlexItem>

                  <EuiFlexItem grow={false}>
                    <EuiLink onClick={handleSignOut}>Sign out</EuiLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
};
