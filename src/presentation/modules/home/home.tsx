import {
  EuiCallOut,
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../../../core/modules/projects/hooks";
import { SampleProject } from "../projects/sample-project";
import { CreateProjectModal } from "../shared/components/create-project-modal/create-project-modal";
import { Container, IconContainer, ProjectButton, Title } from "./home.styles";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: projects } = useProjects();

  const handleAddProject = () => {
    setIsModalVisible(true);
  };

  const handleAddProjectSuccess = (id: string) => {
    setIsModalVisible(false);
    navigate(`/projects/${id}`, {
      state: SampleProject,
    });
  };

  return projects ? (
    <EuiPanel paddingSize="none">
      {isModalVisible && (
        <CreateProjectModal
          onClose={() => setIsModalVisible(false)}
          onConfirm={handleAddProjectSuccess}
        />
      )}
      <Container justifyContent="spaceAround" direction="column">
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
          <EuiFlexGrid columns={4} gutterSize="m">
            <EuiFlexItem>
              <ProjectButton
                style={{
                  border: "dashed 1px #d3dae6",
                }}
                gutterSize="none"
                alignItems="center"
                color="text"
                onClick={handleAddProject}
              >
                <EuiFlexItem grow={false}>
                  <IconContainer isPlaceholder>
                    <EuiIcon color="subdued" type="plus" />
                  </IconContainer>
                </EuiFlexItem>
                <EuiFlexItem>
                  <Title size="s">Create Project</Title>
                </EuiFlexItem>
              </ProjectButton>
            </EuiFlexItem>
            {projects.map((project) => (
              <EuiFlexItem key={project.id}>
                <ProjectButton
                  gutterSize="none"
                  alignItems="center"
                  color="text"
                  onClick={() => navigate(`/projects/${project.id}/stories`)}
                >
                  <EuiFlexItem grow={false}>
                    <IconContainer>
                      <EuiIcon color="subdued" type="folderClosed" />
                    </IconContainer>
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <Title size="s">{project.name}</Title>
                  </EuiFlexItem>
                </ProjectButton>
              </EuiFlexItem>
            ))}
          </EuiFlexGrid>
        </EuiFlexItem>
      </Container>
    </EuiPanel>
  ) : null;
};
