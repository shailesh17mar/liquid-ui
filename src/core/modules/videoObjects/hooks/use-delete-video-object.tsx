import { DeleteVodAssetInput, DeleteVodAssetMutation } from "API";
import { API } from "aws-amplify";
import { deleteVodAsset } from "graphql/mutations";
import { useMutation, useQueryClient } from "react-query";

const deleteVideoObject = async (id: string) => {
  const videoObjectResponse = (await API.graphql({
    query: deleteVodAsset,
    variables: {
      input: {
        id,
      } as DeleteVodAssetInput,
    },
  })) as { data: DeleteVodAssetMutation };
  if (videoObjectResponse.data) return videoObjectResponse.data.deleteVodAsset;
};

export const useDeleteVideoObject = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => {
      return deleteVideoObject(id);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["videoObjects"]);
      },
      onError: () => {
        console.log("what happened?");
      },
    }
  );
};
