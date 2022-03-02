import { DeleteTagCategoryInput, DeleteTagCategoryMutation } from "API";
import { API } from "aws-amplify";
import { deleteTagCategory } from "graphql/mutations";
import { useMutation, useQueryClient } from "react-query";

const deleteCategory = async (id: string) => {
  const storyResponse = (await API.graphql({
    query: deleteTagCategory,
    variables: {
      input: {
        id,
      } as DeleteTagCategoryInput,
    },
  })) as { data: DeleteTagCategoryMutation };
  if (storyResponse.data) return storyResponse.data.deleteTagCategory;
};

export const useDeleteTagCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => {
      return deleteCategory(id);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["tag-categories"]);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
