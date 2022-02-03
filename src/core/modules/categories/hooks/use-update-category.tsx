import { useQueryClient, useMutation } from "react-query";
import { UpdateCategoriesInput, UpdateCategoriesMutation } from "API";
import { API } from "aws-amplify";
import { updateCategories } from "graphql/mutations";

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
  return useMutation(
    (input: Omit<UpdateCategoriesInput, "tenant">) => {
      return updateCategory(input);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["categories"]);
      },
      onError: () => {
        console.log("what happened?");
      },
    }
  );
};
