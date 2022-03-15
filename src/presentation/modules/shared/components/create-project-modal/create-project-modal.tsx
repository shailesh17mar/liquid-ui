import React, { useState } from "react";
import {
  EuiConfirmModal,
  EuiFormRow,
  EuiFieldText,
  EuiButton,
  EuiButtonEmpty,
  EuiPopover,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
} from "@elastic/eui";
import { Projects as Project } from "models";
import { useCreateProject } from "core/modules/projects/hooks";
import { useAuth } from "presentation/context/auth-context";
import { BsEmojiSmile } from "react-icons/bs";
import Picker, { IEmojiData } from "emoji-picker-react";

interface Props {
  onConfirm: (id: string) => void;
  onClose: () => void;
}
export const CreateProjectModal: React.FC<Props> = ({ onConfirm, onClose }) => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState<string | undefined>();
  const mutation = useCreateProject((project) => {
    onConfirm(project.id);
  });

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  const handleConfirm = () => {
    mutation.mutate(
      new Project({ name, icon: chosenEmoji, tenant: user.tenant })
    );
  };

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);
  return (
    <EuiConfirmModal
      title="New Project"
      onCancel={onClose}
      onConfirm={() => {
        handleConfirm();
      }}
      confirmButtonText="Create"
      cancelButtonText="Cancel"
      buttonColor="primary"
      confirmButtonDisabled={name.length < 3}
    >
      <EuiFormRow>
        <EuiFlexGroup alignItems="center" gutterSize="s">
          <EuiFlexItem grow={false}>
            <EuiPopover
              button={
                chosenEmoji ? (
                  <EuiButtonEmpty
                    style={{
                      fontSize: "2rem",
                      lineHeight: "2rem",
                    }}
                    onClick={onButtonClick}
                  >
                    {chosenEmoji}
                  </EuiButtonEmpty>
                ) : (
                  <EuiButtonIcon
                    color="text"
                    size="m"
                    iconType={BsEmojiSmile}
                    onClick={onButtonClick}
                  ></EuiButtonIcon>
                )
              }
              isOpen={isPopoverOpen}
              closePopover={closePopover}
            >
              <Picker
                onEmojiClick={(event, emojiObject) => {
                  setChosenEmoji(emojiObject.emoji);
                  closePopover();
                }}
              />
            </EuiPopover>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldText
              placeholder="Project name"
              autoFocus
              name="name"
              value={name}
              onChange={handleChange}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFormRow>
    </EuiConfirmModal>
  );
};
