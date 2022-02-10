import { useQueryClient, useMutation } from "react-query";
import { UpdateStoriesInput, UpdateStoriesMutation } from "API";
import { API } from "aws-amplify";
import { updateStories } from "graphql/mutations";
import { useAuth } from "presentation/context/auth-context";

const updateStory = async (storyInput: UpdateStoriesInput) => {
  const storyResponse = (await API.graphql({
    query: updateStories,
    variables: {
      input: storyInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: UpdateStoriesMutation };
  if (storyResponse.data) return storyResponse.data.updateStories;
};

export const useUpdateStory = (id: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (input: Omit<UpdateStoriesInput, "tenant">) => {
      return updateStory({ ...input, tenant: user.tenant });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["stories", id]);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
