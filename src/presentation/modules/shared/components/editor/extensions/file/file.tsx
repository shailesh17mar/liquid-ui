import { NodeViewProps } from "@tiptap/react";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import {
  EuiFilePicker,
  EuiLink,
  EuiLoadingSpinner,
  EuiPanel,
  EuiText,
} from "@elastic/eui";
import { useAssetUpload } from "../../../../hooks/use-asset-upload";
import { FileContainer, Placeholder, RemoveButton } from "./file.styles";
import { AiOutlineDelete } from "react-icons/ai";

export const File = (props: NodeViewProps) => {
  const { key } = props.node.attrs;
  const [file, setFile] = useState<string>();
  const [name, setName] = useState<string>();

  const handleFileUploadSuccess = (key: string) => {
    props.updateAttributes({
      key,
    });
  };
  const { upload, progress } = useAssetUpload({
    onSuccess: handleFileUploadSuccess,
    isVideoAsset: false,
  });

  useEffect(() => {
    async function fetchFile() {
      if (key && !file) {
        const { url, metadata } = await API.get("assets", `/assets/${key}`, {});
        setFile(url);
        if (metadata) setName(metadata.name);
      }
    }
    fetchFile();
  }, [key, file]);

  const handleFileChange = (files: FileList | null) => {
    const file = files!![0];
    upload(file);
  };

  return (
    <FileContainer>
      <div className="content">
        {key ? (
          <Placeholder>
            {file ? (
              <EuiLink href={file} target="_blank">
                {name || "Unnamed file"}
              </EuiLink>
            ) : (
              <>Loading...</>
            )}
            <RemoveButton
              onClick={() => {
                props.deleteNode();
              }}
              color="danger"
              iconType={AiOutlineDelete}
              aria-label="Remove file"
            />
          </Placeholder>
        ) : !key && progress > 0 ? (
          <EuiPanel color="subdued">
            <EuiText color="subdued">
              <EuiLoadingSpinner /> &nbsp; Upload in progress... {progress}%
            </EuiText>
          </EuiPanel>
        ) : (
          <EuiFilePicker
            fullWidth
            initialPromptText="Upload or embed file"
            onChange={handleFileChange}
            display="default"
            aria-label="Upload or embed file"
          />
        )}
      </div>
    </FileContainer>
  );
};
