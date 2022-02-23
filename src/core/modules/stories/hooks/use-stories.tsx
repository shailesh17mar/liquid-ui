import { ListStoriesQuery, ModelStoriesFilterInput } from "API";
import { API } from "aws-amplify";
// import { listStories } from "graphql/queries";
import { Stories } from "models";
import { useQuery } from "react-query";

export const listStories = /* GraphQL */ `
  query ListStories(
    $filter: ModelStoriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        categoriesID
        projectsID
        type
        createdAt
        updatedAt
        title
        _lastChangedAt
        _version
        participants {
          name
          email
          persona
          business
        }
      }
      nextToken
      startedAt
    }
  }
`;
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
    return storiesResponse.data.listStories.items;
  }
};

export const useStories = (projectId?: string, enabled: boolean = true) => {
  return useQuery("stories", () => retrieveStories(projectId), { enabled });
};
