import {
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiTitle,
} from "@elastic/eui";
import { ProjectsQueryController } from "core/modules/projects/usecases/project-query-controller";
import { Router } from "main/router";
import { Projects as Project } from "models";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { CreateProjectModal } from "../shared/components/create-project-modal/create-project-modal";
import { IconContainer, ProjectButton } from "./home.styles";

interface HomeProps {
  controller: ProjectsQueryController;
}
export const Home: React.FC<HomeProps> = ({ controller }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: projects } = useQuery("projects", async () => {
    return await controller.getAll();
  });

  const handleAddProject = () => {
    setIsModalVisible(true);
  };

  const handleAddProjectSuccess = (id: string) => {
    queryClient.invalidateQueries("projects");
    setIsModalVisible(false);
    navigate(`/projects/${id}`);
  };

  return (
    <EuiPanel paddingSize="none">
      {isModalVisible && (
        <CreateProjectModal
          onClose={() => setIsModalVisible(false)}
          onConfirm={handleAddProjectSuccess}
        />
      )}
      <EuiFlexGroup
        style={{ width: 900, height: "100%", margin: "0 auto" }}
        justifyContent="spaceAround"
        direction="column"
      >
        <EuiCallOut color="success" iconType="user" title="No projects, yet!">
          <p>Create a project by clicking on button 'Add Project'.</p>
        </EuiCallOut>
        <EuiFlexItem grow={false}>
          <EuiTitle>
            <h1>Recent Projects</h1>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup>
            {projects?.map((project: Project) => (
              <EuiFlexItem key={project.id} grow={false}>
                <ProjectButton
                  color="text"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <IconContainer>
                    <EuiIcon color="subdued" type="folderClosed" />
                  </IconContainer>
                  {project.name}
                </ProjectButton>
              </EuiFlexItem>
            ))}
            <EuiFlexItem grow={false}>
              <ProjectButton color="text" onClick={handleAddProject}>
                <IconContainer isPlaceholder>
                  <EuiIcon color="subdued" type="plus" />
                </IconContainer>
                Add Project
              </ProjectButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};
