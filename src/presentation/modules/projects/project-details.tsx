import { EuiFlexGroup, EuiFlexItem, EuiTitle } from "@elastic/eui";
import { PropertiesEditor } from "../shared/components/property-editor/property-editor";
import { Editor } from "../shared/components/editor/editor";

export const ProjectDetails: React.FC = () => {
  return (
    <EuiFlexGroup
      style={{ width: 900, margin: "0 auto" }}
      justifyContent="spaceAround"
      direction="column"
    >
      <EuiFlexItem>
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem>
            <EuiTitle size="l">
              <h1>Interview with Shailesh</h1>
            </EuiTitle>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <hr />
      <EuiFlexItem>
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem>
            <PropertiesEditor />
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
            <Editor />
          </EuiFlexItem>
          <EuiFlexItem grow={false}></EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <hr />
    </EuiFlexGroup>
  );
};
