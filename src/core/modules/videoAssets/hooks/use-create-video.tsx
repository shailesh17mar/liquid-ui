import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreateVodAssetInput, CreateVodAssetMutation } from "API";
import { createVodAsset } from "graphql/mutations";
import { VodAsset } from "models";
import { userInfo } from "os";
import { useAuth } from "presentation/context/auth-context";

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
  const { user } = useAuth();
  return useMutation(
    (input: Omit<CreateVodAssetInput, "tenant">) => {
      return createVideoAsset({ ...input, tenant: user.tenant });
    },
    {
      onSuccess: (videoAsset, variables) => {
        if (Boolean(videoAsset)) {
          queryClient.invalidateQueries(["videoAssets"]);
          if (callback) callback(videoAsset as VodAsset);
        }
      },
      onError: (error) => {
        console.log("what happened?");
      },
    }
  );
};
