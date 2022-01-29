import { ListStoriesQuery, ModelStoriesFilterInput } from "API";
import { API } from "aws-amplify";
import { listStories } from "graphql/queries";
import { Stories } from "models";
import { useQuery } from "react-query";

const retrieveStories = async (projectId?: string) => {
  const storiesResponse = (await API.graphql({
    query: listStories,
    variables: projectId
      ? {
          filter: {
            projectsID: { eq: projectId },
          } as ModelStoriesFilterInput,
        }
      : undefined,
  })) as {
    data: ListStoriesQuery;
  };
  if (storiesResponse.data && storiesResponse.data.listStories) {
    return storiesResponse.data.listStories.items as Stories[];
  }
};

export const useStories = (projectId?: string, enabled: boolean = true) => {
  return useQuery("stories", () => retrieveStories(projectId), { enabled });
};
