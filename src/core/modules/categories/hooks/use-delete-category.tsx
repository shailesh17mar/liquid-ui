import { DeleteCategoriesInput, DeleteCategoriesMutation } from "API";
import { API } from "aws-amplify";
import { deleteCategories } from "graphql/mutations";
import { useMutation, useQueryClient } from "react-query";

const deleteCategory = async (id: string) => {
  const storyResponse = (await API.graphql({
    query: deleteCategories,
    variables: {
      input: {
        id,
      } as DeleteCategoriesInput,
    },
  })) as { data: DeleteCategoriesMutation };
  if (storyResponse.data) return storyResponse.data.deleteCategories;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => {
      return deleteCategory(id);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["categories"]);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
