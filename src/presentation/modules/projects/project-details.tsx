import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLogo,
  EuiIcon,
  EuiTitle,
} from "@elastic/eui";
import Document from "@tiptap/extension-document";
import { PropertiesEditor } from "../shared/components/property-editor/property-editor";
import { Editor } from "../shared/components/editor/editor";

const ReadmeDocument = Document.extend({
  content: "heading block*",
});
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
export const ProjectDetails: React.FC = () => {
  return (
    <>
      <EuiHeader
        style={{
          position: "absolute",
          right: 0,
          left: 0,
        }}
        sections={[
          {
            items: [<EuiIcon type="documentation" />],
            borders: "right",
          },
        ]}
      />

      <EuiFlexGroup
        style={{ width: 900, margin: "0 auto", marginTop: 100 }}
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
              <Editor content={DefaultReadmeDocument} />
            </EuiFlexItem>
            <EuiFlexItem grow={false}></EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <hr />
      </EuiFlexGroup>
    </>
  );
};
