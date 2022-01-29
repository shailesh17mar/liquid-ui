import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreateHighlightsInput, CreateHighlightsMutation } from "API";
import { createHighlights } from "graphql/mutations";
import { Highlights } from "models";

const createHighlight = async (highlightInput: CreateHighlightsInput) => {
  const highlightResponse = (await API.graphql({
    query: createHighlights,
    variables: {
      input: highlightInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: CreateHighlightsMutation };
  debugger;
  if (highlightResponse.data) return highlightResponse.data.createHighlights;
};

export const useCreateHighlight = (
  callback?: (highlight: Highlights) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: CreateHighlightsInput) => {
      return createHighlight(input);
    },
    {
      onSuccess: (highlight, variables) => {
        if (Boolean(highlight)) {
          queryClient.invalidateQueries(["highlights"]);
          if (callback) callback(highlight as Highlights);
        }
      },
      onError: (error) => {
        debugger;
        console.log("what happened?");
      },
    }
  );
};
