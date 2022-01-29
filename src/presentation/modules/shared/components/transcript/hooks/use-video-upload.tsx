import React, { useEffect, useState } from "react";
import { API, Storage } from "aws-amplify";
import awsvideoconfig from "aws-video-exports";
import { useCreateVideoAsset } from "core/modules/videoAssets/hooks";
import { useCreateVideoObject } from "core/modules/videoObjects/hooks";

interface Props {
  onSuccess: (video: string) => void;
}
export const useVideoUpload = ({ onSuccess }: Props) => {
  const [progress, setProgress] = useState(0);
  const [localVideoUrl, setVideoUrl] = useState<string | undefined>();
  const videoAssetMutation = useCreateVideoAsset();
  const videoObjectMutation = useCreateVideoObject();
  Storage.configure({
    AWSS3: {
      bucket: awsvideoconfig.awsInputVideo,
      customPrefix: {
        public: "",
      },
    },
  });
  useEffect(() => {
    async function test() {
      const url = await Storage.get(
        "47ae7b43-8d79-4363-bdc6-200ceb19988e.mp4",
        {
          level: "public",
        }
      );
      debugger;
      console.log("my url", url);
    }
    test();
  }, []);

  const upload = async (file: File) => {
    const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
    const videoObject = await videoObjectMutation.mutateAsync({});
    const videoAsset = await videoAssetMutation.mutateAsync({
      title: "Video title",
      description: "Video description",
      vodAssetVideoId: videoObject?.id,
    });
    const key = `${videoObject?.id}.${ext}`;
    Storage.put(key, file, {
      resumable: true,
      completeCallback: (event) => {
        //update key on p
        if (videoAsset) {
          onSuccess(videoAsset.id);
        }
      },
      progressCallback: (progress) => {
        setProgress(Math.round((progress.loaded / progress.total) * 100));
      },
      errorCallback: (err) => {
        console.error("Unexpected error while uploading", err);
      },
    });
    setVideoUrl(URL.createObjectURL(file));
    setProgress(10);
  };
  return {
    upload,
    progress,
    videoUrl: localVideoUrl,
  };
};
