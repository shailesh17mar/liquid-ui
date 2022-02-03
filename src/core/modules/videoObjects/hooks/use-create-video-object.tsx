import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreateVideoObjectInput, CreateVideoObjectMutation } from "API";
import { createVideoObject } from "graphql/mutations";
import { VideoObject } from "models";
import { useAuth } from "presentation/context/auth-context";

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
  const { user } = useAuth();
  return useMutation(
    (input: Omit<CreateVideoObjectInput, "tenant">) => {
      return createVideo({ ...input, tenant: user.tenant });
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
