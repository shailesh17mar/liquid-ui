import { DeleteHighlightsInput, DeleteHighlightsMutation } from "API";
import { API } from "aws-amplify";
import { deleteHighlights } from "graphql/mutations";
import { useMutation, useQueryClient } from "react-query";

const deleteHighlight = async (id: string, version: number) => {
  const highlightResponse = (await API.graphql({
    query: deleteHighlights,
    variables: {
      input: {
        id,
        _version: version,
      } as DeleteHighlightsInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: DeleteHighlightsMutation };
  if (highlightResponse.data) return highlightResponse.data.deleteHighlights;
};

export const useDeleteHighlight = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, version }: { id: string; version: number }) => {
      return deleteHighlight(id, version);
    },
    {
      onSuccess: (data, variables) => {
        // queryClient.invalidateQueries(["highlights"]);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
