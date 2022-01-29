import { GetVodAssetQuery } from "API";
import { API } from "aws-amplify";
import { getVodAsset } from "graphql/queries";
import { useQuery } from "react-query";

const retrieveVideoObjectById = async (id: string) => {
  const videoObjectResponse = (await API.graphql({
    query: getVodAsset,
    variables: {
      id,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: GetVodAssetQuery };
  if (videoObjectResponse.data) {
    return videoObjectResponse.data.getVodAsset;
  }
};

export const useVideoObject = (id: string) => {
  return useQuery(["videoObjects", id], () => retrieveVideoObjectById(id));
};
