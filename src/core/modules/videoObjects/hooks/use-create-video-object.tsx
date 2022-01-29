import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreateVideoObjectInput, CreateVideoObjectMutation } from "API";
import { createVideoObject } from "graphql/mutations";
import { VideoObject } from "models";

const createVideo = async (videoObjectInput: CreateVideoObjectInput) => {
  const videoObjectResponse = (await API.graphql({
    query: createVideoObject,
    variables: {
      input: videoObjectInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: CreateVideoObjectMutation };
  if (videoObjectResponse.data)
    return videoObjectResponse.data.createVideoObject;
};

export const useCreateVideoObject = (
  callback?: (videoObject: VideoObject) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: CreateVideoObjectInput) => {
      return createVideo(input);
    },
    {
      onSuccess: (videoObject, variables) => {
        if (Boolean(videoObject)) {
          queryClient.invalidateQueries(["videoObjects"]);
          if (callback) callback(videoObject as VideoObject);
        }
      },
      onError: (error) => {
        debugger;
        console.log("what happened?");
      },
    }
  );
};
