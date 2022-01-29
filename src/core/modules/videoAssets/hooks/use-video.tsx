import { GetVodAssetQuery } from "API";
import { API } from "aws-amplify";
import { getVodAsset } from "graphql/queries";
import { useQuery } from "react-query";

const retrieveVideoAssetById = async (id: string) => {
  const videoAssetResponse = (await API.graphql({
    query: getVodAsset,
    variables: {
      id,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: GetVodAssetQuery };
  if (videoAssetResponse.data) {
    return videoAssetResponse.data.getVodAsset;
  }
};

export const useVideoAsset = (id: string) => {
  return useQuery(["videoAssets", id], () => retrieveVideoAssetById(id));
};
