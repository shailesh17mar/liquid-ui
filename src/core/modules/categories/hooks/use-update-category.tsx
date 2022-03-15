import { useQueryClient, useMutation } from "react-query";
import {
  Categories,
  UpdateCategoriesInput,
  UpdateCategoriesMutation,
} from "API";
import { API } from "aws-amplify";
import { updateCategories } from "graphql/mutations";
import { useAuth } from "presentation/context/auth-context";

const updateCategory = async (categoryInput: UpdateCategoriesInput) => {
  const storyResponse = (await API.graphql({
    query: updateCategories,
    variables: {
      input: categoryInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: UpdateCategoriesMutation };
  if (storyResponse.data) return storyResponse.data.updateCategories;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (input: Omit<UpdateCategoriesInput, "tenant">) => {
      return updateCategory({ ...input, tenant: user.tenant });
    },
    {
      onSettled: (data, variables) => {
        queryClient.invalidateQueries(["categories"]);
      },
      onMutate: async (updatedCategory) => {
        await queryClient.cancelQueries(["categories"]);

        // Snapshot the previous value
        const categories: Required<Categories>[] =
          queryClient.getQueryData(["categories"]) || [];
        const updatedCategories = categories.map((category) => {
          if (category.id === updatedCategory.id) {
            return { ...category, ...updatedCategory };
          }
          return category;
        });

        // Optimistically update to the new value
        queryClient.setQueryData("categories", updatedCategories);

        // Return a context object with the snapshotted value
        return { categories };
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
