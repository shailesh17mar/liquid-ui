import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreateTagCategoryInput, CreateTagCategoryMutation } from "API";
import { createTagCategory } from "graphql/mutations";
import { TagCategory } from "models";
import { useAuth } from "presentation/context/auth-context";

const createCategory = async (categoryInput: CreateTagCategoryInput) => {
  const categoryResponse = (await API.graphql({
    query: createTagCategory,
    variables: {
      input: categoryInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: CreateTagCategoryMutation };
  if (categoryResponse.data) return categoryResponse.data.createTagCategory;
};

export const useCreateTagCategory = (
  callback?: (category: TagCategory) => void
) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (input: Omit<CreateTagCategoryInput, "tenant">) => {
      return createCategory({ ...input, tenant: user.tenant });
    },
    {
      onSuccess: (category, variables) => {
        if (Boolean(category)) {
          queryClient.invalidateQueries(["tag-categories"]);
          if (callback) callback(category as TagCategory);
        }
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
