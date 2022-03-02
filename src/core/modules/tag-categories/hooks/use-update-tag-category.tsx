import { useQueryClient, useMutation } from "react-query";
import {
  UpdateCategoriesInput,
  UpdateTagCategoryInput,
  UpdateTagCategoryMutation,
} from "API";
import { API } from "aws-amplify";
import { updateTagCategory } from "graphql/mutations";
import { useAuth } from "presentation/context/auth-context";

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
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["tag-categories"]);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
