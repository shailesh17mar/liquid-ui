import React, { useState } from "react";

import {
  EuiButton,
  EuiConfirmModal,
  EuiFormRow,
  EuiFieldText,
} from "@elastic/eui";
import { Mutation, useMutation } from "react-query";
import { makeProjectMutationController } from "main/factories/project-factory";
import { Projects as Project } from "models";
import { ModelInit } from "@aws-amplify/datastore";

interface Props {
  onConfirm: (id: string) => void;
  onClose: () => void;
}
export const CreateProjectModal: React.FC<Props> = ({ onConfirm, onClose }) => {
  const [name, setName] = useState("");
  const projectController = makeProjectMutationController();
  const mutation = useMutation(
    (project: ModelInit<Project>) => {
      return projectController.createProject(project);
    },
    {
      onSuccess: (project) => {
        onConfirm(project.id);
      },
    }
  );

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  const handleConfirm = () => {
    const project = mutation.mutate(new Project({ name }));
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
