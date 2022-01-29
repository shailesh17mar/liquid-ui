import { DeleteVodAssetInput, DeleteVodAssetMutation } from "API";
import { API } from "aws-amplify";
import { deleteVodAsset } from "graphql/mutations";
import { useMutation, useQueryClient } from "react-query";

const deleteVideoAsset = async (id: string) => {
  const videoAssetResponse = (await API.graphql({
    query: deleteVodAsset,
    variables: {
      input: {
        id,
      } as DeleteVodAssetInput,
    },
  })) as { data: DeleteVodAssetMutation };
  if (videoAssetResponse.data) return videoAssetResponse.data.deleteVodAsset;
};

export const useDeleteVideoAsset = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => {
      return deleteVideoAsset(id);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["videoAssets"]);
      },
      onError: () => {
        console.log("what happened?");
      },
    }
  );
};
