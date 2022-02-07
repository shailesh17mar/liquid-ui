import { GetTagsQuery } from "API";
import { API } from "aws-amplify";
import { getTags } from "graphql/queries";
import { useQuery } from "react-query";

const retrieveTagById = async (id: string) => {
  const tagResponse = (await API.graphql({
    query: getTags,
    variables: {
      id,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: GetTagsQuery };
  if (tagResponse.data) {
    return tagResponse.data.getTags;
  }
};

export const useTag = (id: string, enabled: boolean = true) => {
  return useQuery(["tags", id], () => retrieveTagById(id), {
    enabled,
  });
};
