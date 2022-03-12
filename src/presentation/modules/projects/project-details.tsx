import { EuiFlexGroup, EuiFlexItem, EuiPanel, EuiTitle } from "@elastic/eui";
import { Editor } from "../shared/components/editor/editor";
import { useParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import {
  useProject,
  useUpdateProject,
} from "../../../core/modules/projects/hooks";
import { useDebouncedCallback } from "use-debounce";
import { ContentLoader } from "../shared/components/content-loader/content-loader";
import { HocuspocusProvider } from "@hocuspocus/provider";

export const ProjectDetails: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { data: project, isLoading } = useProject(id);
  const mutation = useUpdateProject();

  const provider = useMemo(() => {
    return new HocuspocusProvider({
      url: process.env.REACT_APP_COLLAB_ENGINE || "ws://localhost:5000",
      name: `project-${id}`,
    });
  }, []);

  const handleDocumentEditing = async () => {};
  const handleNameChange = useDebouncedCallback((id, name) => {
    if (project) {
      mutation.mutateAsync({
        id,
        name,
      });
    }
  }, 2000);

  return (
    <EuiPanel>
      <EuiFlexGroup
        style={{ width: 900, margin: "0 auto" }}
        justifyContent="spaceAround"
        direction="column"
      >
        {project && !isLoading ? (
          <>
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
                margin: "12px 0",
              }}
            >
              <EuiFlexGroup gutterSize="none">
                <EuiFlexItem>
                  {
                    <Editor
                      onSave={handleDocumentEditing}
                      documentId={id}
                      // content={project.readme || DefaultReadmeDocument}
                      provider={provider}
                    />
                  }
                </EuiFlexItem>
                <EuiFlexItem grow={false}></EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <hr />
          </>
        ) : (
          <ContentLoader />
        )}
      </EuiFlexGroup>
    </EuiPanel>
  );
};
