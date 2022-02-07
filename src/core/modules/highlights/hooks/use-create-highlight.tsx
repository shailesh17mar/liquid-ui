import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreateHighlightsInput, CreateHighlightsMutation } from "API";
import { createHighlights } from "graphql/mutations";
import { Highlights } from "models";
import { useAuth } from "presentation/context/auth-context";

const createHighlight = async (highlightInput: CreateHighlightsInput) => {
  const highlightResponse = (await API.graphql({
    query: createHighlights,
    variables: {
      input: highlightInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: CreateHighlightsMutation };
  if (highlightResponse.data) return highlightResponse.data.createHighlights;
};

export const useCreateHighlight = (
  callback?: (highlight: Highlights) => void
) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (input: Omit<CreateHighlightsInput, "tenant">) => {
      return createHighlight({ ...input, tenant: user.tenant });
    },
    {
      onSuccess: (highlight, variables) => {
        if (Boolean(highlight)) {
          queryClient.invalidateQueries(["highlights"]);
          if (callback) callback(highlight as Highlights);
        }
      },
      onError: (error) => {
        console.log("what happened?");
      },
    }
  );
};
