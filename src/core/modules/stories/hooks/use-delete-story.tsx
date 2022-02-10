import { DeleteStoriesInput, DeleteStoriesMutation } from "API";
import { API } from "aws-amplify";
import { deleteStories } from "graphql/mutations";
import { useMutation, useQueryClient } from "react-query";

const deleteStory = async (id: string) => {
  const storyResponse = (await API.graphql({
    query: deleteStories,
    variables: {
      input: {
        id,
      } as DeleteStoriesInput,
    },
  })) as { data: DeleteStoriesMutation };
  if (storyResponse.data) return storyResponse.data.deleteStories;
};

export const useDeleteStory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => {
      return deleteStory(id);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["stories"]);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
