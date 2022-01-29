import { useQueryClient, useMutation } from "react-query";
import { UpdateVodAssetInput, UpdateVodAssetMutation } from "API";
import { API } from "aws-amplify";
import { updateVodAsset } from "graphql/mutations";
import { VodAsset } from "models";

const updateVideoObject = async (videoObjectInput: UpdateVodAssetInput) => {
  const videoObjectResponse = (await API.graphql({
    query: updateVodAsset,
    variables: {
      input: videoObjectInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: UpdateVodAssetMutation };
  if (videoObjectResponse.data) return videoObjectResponse.data.updateVodAsset;
};

export const useUpdateVideoObject = (
  callback?: (videoObject: VodAsset) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: UpdateVodAssetInput) => {
      return updateVideoObject(input);
    },
    {
      onSuccess: (videoObject, variables) => {
        queryClient.invalidateQueries(["videoObjects"]);
        if (callback) callback(videoObject as VodAsset);
      },
      onError: () => {
        console.log("what happened?");
      },
    }
  );
};
