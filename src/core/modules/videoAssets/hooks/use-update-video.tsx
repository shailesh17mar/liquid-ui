import { useQueryClient, useMutation } from "react-query";
import { UpdateVodAssetInput, UpdateVodAssetMutation } from "API";
import { API } from "aws-amplify";
import { updateVodAsset } from "graphql/mutations";
import { VodAsset } from "models";

const updateVideoAsset = async (videoAssetInput: UpdateVodAssetInput) => {
  const videoAssetResponse = (await API.graphql({
    query: updateVodAsset,
    variables: {
      input: videoAssetInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: UpdateVodAssetMutation };
  if (videoAssetResponse.data) return videoAssetResponse.data.updateVodAsset;
};

export const useUpdateVideoAsset = (
  callback?: (videoAsset: VodAsset) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: UpdateVodAssetInput) => {
      return updateVideoAsset(input);
    },
    {
      onSuccess: (videoAsset, variables) => {
        queryClient.invalidateQueries(["videoAssets"]);
        if (callback) callback(videoAsset as VodAsset);
      },
      onError: () => {
        console.log("what happened?");
      },
    }
  );
};
