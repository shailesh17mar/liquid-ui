import { useQueryClient, useMutation } from "react-query";
import { UpdateStoriesInput, UpdateStoriesMutation } from "API";
import { API } from "aws-amplify";
import { updateStories } from "graphql/mutations";

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
  return useMutation(
    (input: Omit<UpdateStoriesInput, "tenant">) => {
      return updateStory(input);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["stories", id]);
      },
      onError: () => {
        console.log("what happened?");
      },
    }
  );
};
