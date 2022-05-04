import { NodeViewProps } from "@tiptap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { API } from "aws-amplify";
import { EuiImage, EuiLoadingSpinner, EuiPanel, EuiText } from "@elastic/eui";
import { ImageContainer } from "./image.styles";
import { useAssetUpload } from "../../../../hooks/use-asset-upload";

export const Image = (props: NodeViewProps) => {
  const { key } = props.node.attrs;
  const uploaderRef = useRef<HTMLInputElement>(null);
  const [isFileSelected] = useState(false);
  const [image, setImage] = useState<string | undefined>();

  const handleImageUploadSuccess = (key: string) => {
    props.updateAttributes({
      key,
    });
  };
  const { upload, progress } = useAssetUpload({
    onSuccess: handleImageUploadSuccess,
    isVideoAsset: false,
  });
  //when key is not present
  useEffect(() => {
    if (!key) {
      uploaderRef.current?.click();
    }
  }, [key]);

  useEffect(() => {
    async function fetchImage() {
      if (key && !image) {
        const { url } = await API.get("assets", `/assets/${key}`, {});
        setImage(url);
      }
    }
    fetchImage();
  }, [key, image]);

  const handleFocus = useCallback(() => {
    setTimeout(() => {
      if (!isFileSelected && uploaderRef?.current) {
        if (uploaderRef?.current.files?.length === 0 && !key) {
          window.removeEventListener("focus", handleFocus);
          props.deleteNode();
        }
      }
    }, 500);
  }, [isFileSelected]);

  const handleFileTrigger = () => {
    window.addEventListener("focus", handleFocus);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.removeEventListener("focus", handleFocus);
    const file = e.target.files!![0];
    upload(file);
  };

  return (
    <ImageContainer>
      <div className="content">
        <form style={{ display: "none" }}>
          <input
            type="file"
            id="imageInput"
            ref={uploaderRef}
            accept="image/*"
            onClick={handleFileTrigger}
            onChange={handleFileChange}
          />
        </form>
        {image ? (
          <EuiImage src={image} alt="image bro" />
        ) : (
          progress > 0 &&
          !key && (
            <EuiPanel color="subdued">
              <EuiText color="subdued">
                <EuiLoadingSpinner /> &nbsp; Upload in progress... {progress}%
              </EuiText>
            </EuiPanel>
          )
        )}
      </div>
    </ImageContainer>
  );
};
