import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLogo,
  EuiIcon,
  EuiLoadingChart,
  EuiPanel,
  EuiTitle,
} from "@elastic/eui";
import Document from "@tiptap/extension-document";
import { PropertiesEditor } from "../shared/components/property-editor/property-editor";
import { Editor } from "../shared/components/editor/editor";
import { matchPath, useParams } from "react-router-dom";
import { useCallback } from "react";
import { ProjectMutationController } from "core/modules/projects/usecases/project-mutation-controller";
import { Projects } from "models";
import { ProjectsQueryController } from "core/modules/projects/usecases/project-query-controller";
import { useQuery, useQueryClient } from "react-query";
import useWebRtcProvider from "../shared/components/editor/hooks/use-webrtc-provider";
import { WebrtcProvider } from "y-webrtc";
import { Doc } from "yjs";
import { IconPanoramaWideAngle } from "@aws-amplify/ui-react";

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
const ReadmeDocument = Document.extend({
  content: "heading block*",
});

interface Props {
  mutationController: ProjectMutationController;
  queryController: ProjectsQueryController;
}

const route = matchPath("/projects/:id", window.location.pathname);
const id = route?.params.id;
const doc = new Doc({ guid: id });
const provider = new WebrtcProvider(`liquid-${id}`, doc);

export const ProjectDetails: React.FC<Props> = ({
  mutationController,
  queryController,
}) => {
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();
  const { data: project, isLoading } = useQuery(
    `projects-details-${id}`,
    async () => {
      return await queryController.getById(id);
    }
  );
  const handleSave = useCallback(
    async (id, body) => {
      if (body) {
        await mutationController.updateProject(id, { readme: body });
        queryClient.invalidateQueries(`projects-details-${id}`);
      }
    },
    [mutationController, queryClient]
  );
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
                <h1>Video Interviews</h1>
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
              <Editor
                onSave={handleSave}
                documentId={id}
                content={project.readme || DefaultReadmeDocument}
                provider={provider}
              />
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
