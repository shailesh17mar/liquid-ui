import { ListTagsQuery, ModelTagsFilterInput, Tags } from "API";
import { API } from "aws-amplify";
import { listTags } from "graphql/queries";
import { useQuery } from "react-query";

const retrieveTags = async (projectId?: string) => {
  const tagsResponse = (await API.graphql({
    query: listTags,
    variables: projectId
      ? {
          filter: {
            projectsID: { eq: projectId },
          } as ModelTagsFilterInput,
        }
      : undefined,
  })) as {
    data: ListTagsQuery;
  };
  if (tagsResponse.data && tagsResponse.data.listTags) {
    return tagsResponse.data.listTags.items as Required<Tags>[];
  }
  return [];
};

export const useTags = (projectId?: string, enabled: boolean = true) => {
  return useQuery("tags", () => retrieveTags(projectId), {
    enabled,
  });
};
