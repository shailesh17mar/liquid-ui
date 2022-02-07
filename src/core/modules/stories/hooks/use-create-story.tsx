import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreateStoriesInput, CreateStoriesMutation } from "API";
import { createStories } from "graphql/mutations";
import { Stories } from "models";
import { useAuth } from "presentation/context/auth-context";

const createStory = async (storyInput: CreateStoriesInput) => {
  const storyResponse = (await API.graphql({
    query: createStories,
    variables: {
      input: storyInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: CreateStoriesMutation };
  if (storyResponse.data) return storyResponse.data.createStories;
};

export const useCreateStory = (callback: (story: Stories) => void) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (input: Omit<CreateStoriesInput, "tenant">) => {
      return createStory({ ...input, tenant: user.tenant });
    },
    {
      onSuccess: (story, variables) => {
        if (Boolean(story)) {
          queryClient.invalidateQueries(["stories"]);
          callback(story as Stories);
        }
      },
      onError: (error) => {
        console.log("what happened?");
      },
    }
  );
};
