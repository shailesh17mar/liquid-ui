import { ListHighlightsQuery, ModelHighlightsFilterInput } from "API";
import { API } from "aws-amplify";
import { listHighlights } from "graphql/queries";
import { Highlights } from "models";
import { useQuery } from "react-query";

interface Filter {
  projectId?: string;
  transcriptId?: string;
}
const retrieveHighlights = async (filter?: Filter) => {
  const { projectId, transcriptId } = filter || {};
  const highlightsResponse = (await API.graphql({
    query: listHighlights,
    variables: projectId
      ? {
          filter: {
            projectsID: projectId && { eq: projectId },
            transcriptionID: transcriptId && { eq: transcriptId },
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

export const useHighlights = (filter?: Filter, enabled: boolean = true) => {
  return useQuery("highlights", () => retrieveHighlights(filter), {
    enabled,
  });
};
