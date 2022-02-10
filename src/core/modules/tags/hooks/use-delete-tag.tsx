import { DeleteTagsInput, DeleteTagsMutation } from "API";
import { API } from "aws-amplify";
import { deleteTags } from "graphql/mutations";
import { useMutation, useQueryClient } from "react-query";

const deleteTag = async (id: string) => {
  const tagResponse = (await API.graphql({
    query: deleteTags,
    variables: {
      input: {
        id,
      } as DeleteTagsInput,
    },
  })) as { data: DeleteTagsMutation };
  if (tagResponse.data) return tagResponse.data.deleteTags;
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => {
      return deleteTag(id);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["tags"]);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
