import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreateVodAssetInput, CreateVodAssetMutation } from "API";
import { createVodAsset } from "graphql/mutations";
import { VodAsset } from "models";

const createVideoAsset = async (videoAssetInput: CreateVodAssetInput) => {
  const videoAssetResponse = (await API.graphql({
    query: createVodAsset,
    variables: {
      input: videoAssetInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: CreateVodAssetMutation };
  if (videoAssetResponse.data) return videoAssetResponse.data.createVodAsset;
};

export const useCreateVideoAsset = (
  callback?: (videoAsset: VodAsset) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: CreateVodAssetInput) => {
      return createVideoAsset(input);
    },
    {
      onSuccess: (videoAsset, variables) => {
        if (Boolean(videoAsset)) {
          queryClient.invalidateQueries(["videoAssets"]);
          if (callback) callback(videoAsset as VodAsset);
        }
      },
      onError: (error) => {
        debugger;
        console.log("what happened?");
      },
    }
  );
};
