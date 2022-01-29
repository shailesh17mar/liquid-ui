import { ListVodAssetsQuery, ModelVodAssetFilterInput } from "API";
import { API } from "aws-amplify";
import { listVodAssets } from "graphql/queries";
import { VodAsset } from "models";
import { useQuery } from "react-query";

const retrieveVideoAsset = async (projectId?: string) => {
  const videoAssetsResponse = (await API.graphql({
    query: listVodAssets,
    variables: projectId
      ? {
          filter: {
            projectsID: { eq: projectId },
          } as ModelVodAssetFilterInput,
        }
      : undefined,
  })) as {
    data: ListVodAssetsQuery;
  };
  if (videoAssetsResponse.data && videoAssetsResponse.data.listVodAssets) {
    return videoAssetsResponse.data.listVodAssets.items as VodAsset[];
  }
};

export const useVideoAssets = (projectId?: string, enabled: boolean = true) => {
  return useQuery("videoAssets", () => retrieveVideoAsset(projectId), {
    enabled,
  });
};
