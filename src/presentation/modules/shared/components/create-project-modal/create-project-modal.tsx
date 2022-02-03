import React, { useState } from "react";
import { EuiConfirmModal, EuiFormRow, EuiFieldText } from "@elastic/eui";
import { Projects as Project } from "models";
import { useCreateProject } from "core/modules/projects/hooks";
import { useAuth } from "presentation/context/auth-context";

interface Props {
  onConfirm: (id: string) => void;
  onClose: () => void;
}
export const CreateProjectModal: React.FC<Props> = ({ onConfirm, onClose }) => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const mutation = useCreateProject((project) => {
    onConfirm(project.id);
  });

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  const handleConfirm = () => {
    mutation.mutate(new Project({ name, tenant: user.tenant }));
  };

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
        <EuiFieldText
          placeholder="Project name"
          autoFocus
          name="name"
          value={name}
          onChange={handleChange}
        />
      </EuiFormRow>
    </EuiConfirmModal>
  );
};
