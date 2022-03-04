import { GetVodAssetQuery } from "API";
import { API } from "aws-amplify";
import { getVodAsset } from "graphql/queries";
import { VodAsset } from "models";
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

export const useVideoAsset = (
  id: string,
  enabled: boolean = true,
  isPolling: boolean = false
) => {
  return useQuery(["videoAssets", id], () => retrieveVideoAssetById(id), {
    refetchInterval: isPolling ? 10000 : undefined,
    enabled,
  });
};
