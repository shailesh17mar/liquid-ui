import {
  Highlights,
  ListCategoriesQuery,
  ListHighlightsQuery,
  ListTagsQuery,
  ModelCategoriesFilterInput,
  ModelHighlightsFilterInput,
  ModelTagsFilterInput,
  Tags,
} from "API";
import { API } from "aws-amplify";
import { Categories } from "models";
import { useQuery } from "react-query";

// highlight has Tags
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        label
        color
        tagCategory {
          id
          name
          color
        }
      }
      nextToken
    }
  }
`;
export const listHighlights = /* GraphQL */ `
  query ListHighlights(
    $filter: ModelHighlightsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHighlights(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        Tags
      }
      nextToken
    }
  }
`;

interface Metrics {
  legends: Tags[];
  tagMetrics: [
    {
      id: string;
      label: string;
      color: string;
      count: number;
    }
  ];
  tagCategoryMetrics: [
    {
      id: string;
      label: string;
      color: string;
      count: number;
    }
  ];
}
const fetchMetrics = async (projectId: string) => {
  const tagsResponse = (await API.graphql({
    query: listTags,
    variables: {
      filter: {
        projectsID: { eq: projectId },
      } as ModelTagsFilterInput,
    },
  })) as {
    data: ListTagsQuery;
  };

  const highlightsResponse = (await API.graphql({
    query: listHighlights,
    variables: {
      filter: {
        projectsID: { eq: projectId },
      } as ModelHighlightsFilterInput,
    },
  })) as {
    data: ListHighlightsQuery;
  };

  if (tagsResponse.data && tagsResponse.data.listTags) {
    if (highlightsResponse.data && highlightsResponse.data.listHighlights) {
      const highlightMetrics =
        highlightsResponse.data.listHighlights.items.reduce(
          //@ts-ignore
          (acc: any, highlight: Highlights) => {
            if (highlight.Tags) {
              (highlight.Tags as Required<string>[]).forEach(
                (tagId: string) => {
                  if (!acc[tagId]) {
                    acc[tagId] = 0;
                  }
                  acc[tagId]++;
                }
              );
            }
            return acc;
          },
          {}
        );
      const tagMetrics: any = [];
      const tagCategoryMetrics = {};
      //@ts-ignore
      tagsResponse.data.listTags.items.forEach((tag: Tags) => {
        tagMetrics.push({
          id: tag.id,
          label: tag.label,
          color: tag.color,
          //@ts-ignore
          count: highlightMetrics[tag.id],
        });
        //@ts-ignore
        const tagCategoryId = tag.tagCategory.id;
        //@ts-ignore
        if (!tagCategoryMetrics[tagCategoryId]) {
          //@ts-ignore
          tagCategoryMetrics[tagCategoryId] = {
            id: tagCategoryId,
            //@ts-ignore
            label: tag.tagCategory.name,
            //@ts-ignore
            color: tag.tagCategory.color,
            count: 0,
          };
        }
        //@ts-ignore
        tagCategoryMetrics[tagCategoryId].count =
          //@ts-ignore
          tagCategoryMetrics[tagCategoryId].count + highlightMetrics[tag.id];
      });
      //@ts-ignore
      return {
        tags: tagsResponse.data.listTags.items,
        tagMetrics,
        tagCategoryMetrics: Object.values(tagCategoryMetrics),
      } as Metrics;
    }
  }
};

export const useAnalytics = (projectId: string) => {
  return useQuery(["analytics", projectId], () => fetchMetrics(projectId));
};
