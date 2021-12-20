import {
  makeProjectMutationController,
  makeProjectQueryController,
} from "main/factories/project-factory";
import { ProjectDetails } from "presentation/modules/projects";
import React from "react";

export const ProjectDetailsPage: React.FC = () => {
  return (
    <ProjectDetails
      queryController={makeProjectQueryController()}
      mutationController={makeProjectMutationController()}
    />
  );
};

export default ProjectDetailsPage;
