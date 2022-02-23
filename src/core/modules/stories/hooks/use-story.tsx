import { GetHighlightsQuery, GetStoriesQuery } from "API";
import { API } from "aws-amplify";
import { getHighlights, getStories, listHighlights } from "graphql/queries";
import { MetaProperty } from "presentation/modules/shared/components/editor/components/property-editor/types";
import { useQuery } from "react-query";

const getMatches = (content: string, regex: any, index: number) => {
  index || (index = 1); // default to the first capturing group
  var matches = [];
  var match;
  while ((match = regex.exec(content))) {
    matches.push(match[index]);
  }
  return matches;
};
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
        additonalFields: story.participants.additonalFields
          ? JSON.parse(story.participants.additonalFields)
          : {},
      };
    }
    if (story && story.content) {
      const content = JSON.parse(story.content);
      return { ...story, content };
    }
    return story;
  }
};

export const useStory = (id: string, enabled: boolean = true) => {
  return useQuery(["stories", id], () => retrieveStoryById(id), { enabled });
};
