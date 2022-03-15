import { useQueryClient, useMutation } from "react-query";
import {
  UpdateCategoriesInput,
  UpdateTagCategoryInput,
  UpdateTagCategoryMutation,
} from "API";
import { API } from "aws-amplify";
import { updateTagCategory } from "graphql/mutations";
import { useAuth } from "presentation/context/auth-context";
import { TagCategory } from "models";

const updateCategory = async (categoryInput: UpdateCategoriesInput) => {
  const storyResponse = (await API.graphql({
    query: updateTagCategory,
    variables: {
      input: categoryInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: UpdateTagCategoryMutation };
  if (storyResponse.data) return storyResponse.data.updateTagCategory;
};

export const useUpdateTagCategory = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (input: Omit<UpdateTagCategoryInput, "tenant">) => {
      return updateCategory({ ...input, tenant: user.tenant });
    },
    {
      onSettled: (data, variables) => {
        queryClient.invalidateQueries(["tag-categories-project"]);
      },
      onError: (error) => {
        throw error;
      },
      onMutate: async (updatedTagCategory) => {
        await queryClient.cancelQueries(["tag-categories-project"]);

        // Snapshot the previous value
        const categories: Required<TagCategory>[] =
          queryClient.getQueryData(["tag-categories-project"]) || [];
        const updatedCategories = categories.map((category) => {
          if (category.id === updatedTagCategory.id) {
            return { ...category, ...updatedTagCategory };
          }
          return category;
        });

        // Optimistically update to the new value
        queryClient.setQueryData("tag-categories-project", updatedCategories);

        // Return a context object with the snapshotted value
        return { categories };
      },
    }
  );
};
