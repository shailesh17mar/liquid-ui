import { GetHighlightsQuery } from "API";
import { API } from "aws-amplify";
import { getHighlights } from "graphql/queries";
import { useQuery } from "react-query";

const retrieveHighlightById = async (id: string) => {
  const highlightResponse = (await API.graphql({
    query: getHighlights,
    variables: {
      id,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: GetHighlightsQuery };
  if (highlightResponse.data) {
    return highlightResponse.data.getHighlights;
  }
};

export const useHighlight = (id: string) => {
  return useQuery(["highlights", id], () => retrieveHighlightById(id));
};
