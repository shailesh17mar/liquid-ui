import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { Storage } from "aws-amplify";
import {
  EuiImage,
  EuiLoadingSpinner,
  EuiPanel,
  EuiProgress,
  EuiText,
} from "@elastic/eui";
import { nanoid } from "nanoid";
import { ImageContainer } from "./image.styles";

export const Image = (props: NodeViewProps) => {
  const { key } = props.node.attrs;
  const uploaderRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<string | undefined>();

  //when key is not present
  useEffect(() => {
    if (!key) {
      uploaderRef.current?.click();
    }
  }, [key]);

  useEffect(() => {
    async function fetchImageURL() {
      if (key && !image) {
        const uri = await Storage.get(key, {
          level: "public",
        });
        setImage(uri);
      }
    }
    fetchImageURL();
  }, [image, key]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files!![0];
    const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
    const key = `${nanoid()}.${ext}`;
    Storage.put(key, file, {
      resumable: true,
      completeCallback: (event) => {
        //update key on p
        props.updateAttributes({
          key,
        });
        // setImage(event.key);
      },
      progressCallback: (progress) => {
        setProgress(Math.round((progress.loaded / progress.total) * 100));
      },
      errorCallback: (err) => {
        console.error("Unexpected error while uploading", err);
      },
    });
    setProgress(10);
  };
  // useEffect(() => {
  //   ;
  // }, [file, key]);

  //TODO: Clear the empty placeholder
  return (
    <ImageContainer>
      <div className="content">
        <form style={{ display: "none" }}>
          <input
            type="file"
            id="imageInput"
            ref={uploaderRef}
            accept="image/*"
            onChange={handleFileChange}
          />
        </form>
        {image ? (
          <EuiImage src={image} alt="image bro" />
        ) : (
          progress > 0 && (
            <EuiPanel color="subdued">
              <EuiText color="subdued">
                <EuiLoadingSpinner /> &nbsp; Upload in progress
              </EuiText>
            </EuiPanel>
          )
        )}
      </div>
    </ImageContainer>
  );
};
