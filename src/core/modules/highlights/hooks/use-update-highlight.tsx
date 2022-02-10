import { useQueryClient, useMutation } from "react-query";
import { UpdateHighlightsInput, UpdateHighlightsMutation } from "API";
import { API } from "aws-amplify";
import { updateHighlights } from "graphql/mutations";
import { Highlights } from "models";
import { useAuth } from "presentation/context/auth-context";

const updateHighlight = async (highlightInput: UpdateHighlightsInput) => {
  const highlightResponse = (await API.graphql({
    query: updateHighlights,
    variables: {
      input: highlightInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: UpdateHighlightsMutation };
  if (highlightResponse.data?.updateHighlights) {
    let highlight = highlightResponse.data.updateHighlights;
    return highlight;
  }
};

export const useUpdateHighlight = (
  id: string,
  callback?: (highlight: Highlights) => void
) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (input: Omit<UpdateHighlightsInput, "tenant">) => {
      return updateHighlight({ ...input, tenant: user.tenant });
    },
    {
      onSuccess: (highlight, variables) => {
        queryClient.invalidateQueries(["highlights", id]);
        if (callback) callback(highlight as Highlights);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
