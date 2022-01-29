import { DeleteHighlightsInput, DeleteHighlightsMutation } from "API";
import { API } from "aws-amplify";
import { deleteHighlights } from "graphql/mutations";
import { useMutation, useQueryClient } from "react-query";

const deleteHighlight = async (id: string) => {
  const highlightResponse = (await API.graphql({
    query: deleteHighlights,
    variables: {
      input: {
        id,
      } as DeleteHighlightsInput,
    },
  })) as { data: DeleteHighlightsMutation };
  if (highlightResponse.data) return highlightResponse.data.deleteHighlights;
};

export const useDeleteHighlight = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => {
      return deleteHighlight(id);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["highlights"]);
      },
      onError: () => {
        console.log("what happened?");
      },
    }
  );
};
