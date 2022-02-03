import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreateCategoriesInput, CreateCategoriesMutation } from "API";
import { createCategories } from "graphql/mutations";
import { Categories } from "models";
import { useAuth } from "presentation/context/auth-context";

const createCategory = async (categoryInput: CreateCategoriesInput) => {
  const categoryResponse = (await API.graphql({
    query: createCategories,
    variables: {
      input: categoryInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: CreateCategoriesMutation };
  if (categoryResponse.data) return categoryResponse.data.createCategories;
};

export const useCreateCategory = (
  callback?: (category: Categories) => void
) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (input: Omit<CreateCategoriesInput, "tenant">) => {
      return createCategory({ ...input, tenant: user.tenant });
    },
    {
      onSuccess: (category, variables) => {
        if (Boolean(category)) {
          queryClient.invalidateQueries(["categories"]);
          if (callback) callback(category as Categories);
        }
      },
      onError: () => {
        console.log("what happened?");
      },
    }
  );
};
