import { useState } from "react";
import { API } from "aws-amplify";
import { useCreateVideoAsset } from "core/modules/videoAssets/hooks";

interface Props {
  isVideoAsset: boolean;
  onSuccess: (id: string) => void;
}
export const useAssetUpload = ({ onSuccess, isVideoAsset }: Props) => {
  const [progress, setProgress] = useState(1);
  const [assetUrl] = useState<string | undefined>();
  const videoAssetMutation = useCreateVideoAsset();

  const uploadToS3 = (
    url: string,
    file: File,
    progressCallback: (progress: number) => void
  ) => {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr);
          } else {
            reject(xhr);
          }
        }
      };

      if (progressCallback) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            var percentComplete = (e.loaded / file.size) * 100;
            progressCallback(percentComplete);
          }
        };
      }

      xhr.open("PUT", url);
      xhr.send(file);
    });
  };

  const upload = async (file: File) => {
    const contentType = file.type;
    const uploadTarget = await API.post("assets", "/assets/upload", {
      body: {
        contentType,
      },
    });
    await uploadToS3(uploadTarget.uploadURL, file, (progress: number) => {
      setProgress(Math.round(progress));
    });
    if (isVideoAsset) {
      const videoAsset = await videoAssetMutation.mutateAsync({
        title: file.name,
        video: uploadTarget.name,
      });
      if (videoAsset) {
        await API.get("assets", `/assets/${uploadTarget.name}`, {});
        onSuccess(videoAsset?.id);
      }
    } else {
      await API.get("assets", `/assets/${uploadTarget.name}`, {});
      onSuccess(uploadTarget.name);
    }
  };
  return {
    upload,
    progress,
    videoUrl: assetUrl,
  };
};
