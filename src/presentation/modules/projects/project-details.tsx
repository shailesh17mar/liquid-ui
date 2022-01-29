import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingChart,
  EuiPanel,
  EuiTitle,
} from "@elastic/eui";
import { Editor } from "../shared/components/editor/editor";
import { matchPath, useParams } from "react-router-dom";
import { useCallback } from "react";
import { ProjectMutationController } from "core/modules/projects/usecases/project-mutation-controller";
import { ProjectsQueryController } from "core/modules/projects/usecases/project-query-controller";
import { WebrtcProvider } from "y-webrtc";
import { Doc } from "yjs";
import { useDebouncedCallback } from "use-debounce/lib";
import { useProject, useUpdateProject } from "./hooks";

const DefaultReadmeDocument = `
          <h2>
          Overview
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, odio reiciendis eaque asperiores dicta laboriosam voluptates quos ipsam molestias at. Exercitationem possimus sapiente, similique inventore nobis harum eius! Consequatur, distinctio!
          </p>
          <h2>
          Purpose and goals
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, odio reiciendis eaque asperiores dicta laboriosam voluptates quos ipsam molestias at. Exercitationem possimus sapiente, similique inventore nobis harum eius! Consequatur, distinctio!
          </p>
          <ul>
            <li>This is a bullet list.</li>
            <li>And it has three list items.</li>
            <li>Here is the third one.</li>
          </ul>
          <h2>
          Team
          </h2>
          <h2>
          Partipants Criteria
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, odio reiciendis eaque asperiores dicta laboriosam voluptates quos ipsam molestias at. Exercitationem possimus sapiente, similique inventore nobis harum eius! Consequatur, distinctio!
          </p>
          <ul>
            <li>This is a bullet list.</li>
            <li>And it has three list items.</li>
            <li>Here is the third one.</li>
          </ul>

          <h2>
          Activities
          </h2>
          <ul data-type="taskList">
            <li data-type="taskItem" data-checked="true">flour</li>
            <li data-type="taskItem" data-checked="true">baking powder</li>
            <li data-type="taskItem" data-checked="true">salt</li>
            <li data-type="taskItem" data-checked="false">sugar</li>
            <li data-type="taskItem" data-checked="false">milk</li>
            <li data-type="taskItem" data-checked="false">eggs</li>
            <li data-type="taskItem" data-checked="false">butter</li>
          </ul>
        `;

interface Props {
  mutationController: ProjectMutationController;
  queryController: ProjectsQueryController;
}

const route = matchPath("/projects/:id", window.location.pathname);
const id = route?.params.id;
const doc = new Doc({ guid: id });
const provider = new WebrtcProvider(`liquid-${id}`, doc);

export const ProjectDetails: React.FC<Props> = () => {
  const { id } = useParams() as { id: string };
  const { data: project, isLoading } = useProject(id);
  const mutation = useUpdateProject();

  const handleDocumentEditing = useCallback(
    async (id, body) => {
      if (body && project) {
        mutation.mutate({
          id,
          readme: body,
          _version: project._version,
        });
      }
    },
    [mutation, project]
  );
  const handleNameChange = useDebouncedCallback((id, name) => {
    if (project) {
      mutation.mutate({
        id,
        name,
        _version: project._version,
      });
    }
  }, 1000);

  return project && !isLoading ? (
    <EuiPanel>
      <EuiFlexGroup
        style={{ width: 900, margin: "0 auto" }}
        justifyContent="spaceAround"
        direction="column"
      >
        <EuiFlexItem>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem>
              <EuiTitle size="l">
                <span
                  className="euiTitle--large"
                  contentEditable
                  onInput={(e: any) => {
                    handleNameChange(id, e.target.innerText);
                  }}
                >
                  {project.name}
                </span>
              </EuiTitle>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <hr />
        <EuiFlexItem
          style={{
            minHeight: 400,
            margin: "12px 0",
          }}
        >
          <EuiFlexGroup gutterSize="none">
            <EuiFlexItem>
              {project.readme && (
                <Editor
                  onSave={handleDocumentEditing}
                  documentId={id}
                  content={project.readme || DefaultReadmeDocument}
                  provider={provider}
                />
              )}
            </EuiFlexItem>
            <EuiFlexItem grow={false}></EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <hr />
      </EuiFlexGroup>
    </EuiPanel>
  ) : (
    <EuiLoadingChart size="xl" />
  );
};
