import { useQueryClient, useMutation } from "react-query";
import { UpdateHighlightsInput, UpdateHighlightsMutation } from "API";
import { API } from "aws-amplify";
import { updateHighlights } from "graphql/mutations";
import { Highlights } from "models";

const updateHighlight = async (highlightInput: UpdateHighlightsInput) => {
  const highlightResponse = (await API.graphql({
    query: updateHighlights,
    variables: {
      input: highlightInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: UpdateHighlightsMutation };
  if (highlightResponse.data) return highlightResponse.data.updateHighlights;
};

export const useUpdateHighlight = (
  callback?: (highlight: Highlights) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: Omit<UpdateHighlightsInput, "tenant">) => {
      return updateHighlight(input);
    },
    {
      onSuccess: (highlight, variables) => {
        queryClient.invalidateQueries(["highlights"]);
        if (callback) callback(highlight as Highlights);
      },
      onError: () => {
        console.log("what happened?");
      },
    }
  );
};
