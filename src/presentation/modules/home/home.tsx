import {
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiLoadingChart,
  EuiPanel,
  EuiTitle,
} from "@elastic/eui";
import { ProjectsQueryController } from "core/modules/projects/usecases/project-query-controller";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../projects/hooks";
import { CreateProjectModal } from "../shared/components/create-project-modal/create-project-modal";
import { IconContainer, ProjectButton } from "./home.styles";

interface HomeProps {
  controller: ProjectsQueryController;
}
export const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: projects, isLoading } = useProjects();

  const handleAddProject = () => {
    setIsModalVisible(true);
  };

  const handleAddProjectSuccess = (id: string) => {
    setIsModalVisible(false);
    navigate(`/projects/${id}`);
  };

  if (isLoading) return <EuiLoadingChart size="xl" />;
  return projects ? (
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
        {projects.length === 0 && (
          <EuiCallOut color="success" iconType="user" title="No projects, yet!">
            <p>Create a project by clicking on button 'Add Project'.</p>
          </EuiCallOut>
        )}
        <EuiFlexItem grow={false}>
          <EuiTitle>
            <h1>Recent Projects</h1>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup>
            {projects.map((project) => (
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
  ) : null;
};
