import { GetStoriesQuery } from "API";
import { API } from "aws-amplify";
import { getStories } from "graphql/queries";
import { useQuery } from "react-query";

const retrieveStoryById = async (id: string) => {
  const storyResponse = (await API.graphql({
    query: getStories,
    variables: {
      id,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: GetStoriesQuery };

  if (storyResponse.data) {
    const story = storyResponse.data.getStories;
    if (story?.participants && story?.participants.business) {
      story.participants = {
        ...story.participants,
        business: JSON.parse(story.participants.business),
      };
    }
    if (story?.content)
      return { ...story, content: JSON.parse(story?.content) };
  }
};

export const useStory = (id: string) => {
  return useQuery(["stories", id], () => retrieveStoryById(id));
};
