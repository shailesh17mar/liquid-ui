import { ListHighlightsQuery, ModelHighlightsFilterInput } from "API";
import { API } from "aws-amplify";
import { listHighlights } from "graphql/queries";
import { Highlights } from "models";
import { useQuery } from "react-query";

const retrieveHighlights = async (projectId?: string) => {
  const highlightsResponse = (await API.graphql({
    query: listHighlights,
    variables: projectId
      ? {
          filter: {
            projectsID: { eq: projectId },
          } as ModelHighlightsFilterInput,
        }
      : undefined,
  })) as {
    data: ListHighlightsQuery;
  };
  if (highlightsResponse.data && highlightsResponse.data.listHighlights) {
    return highlightsResponse.data.listHighlights.items as Highlights[];
  }
};

export const useHighlights = (projectId?: string, enabled: boolean = true) => {
  return useQuery("highlights", () => retrieveHighlights(projectId), {
    enabled,
  });
};
