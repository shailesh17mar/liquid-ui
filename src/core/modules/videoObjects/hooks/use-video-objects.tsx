import { ListVodAssetsQuery, ModelVodAssetFilterInput } from "API";
import { API } from "aws-amplify";
import { listVodAssets } from "graphql/queries";
import { VodAsset } from "models";
import { useQuery } from "react-query";

const retrieveVideoObject = async (projectId?: string) => {
  const videoObjectsResponse = (await API.graphql({
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
  if (videoObjectsResponse.data && videoObjectsResponse.data.listVodAssets) {
    return videoObjectsResponse.data.listVodAssets.items as VodAsset[];
  }
};

export const useVideoObjects = (
  projectId?: string,
  enabled: boolean = true
) => {
  return useQuery("videoObjects", () => retrieveVideoObject(projectId), {
    enabled,
  });
};
