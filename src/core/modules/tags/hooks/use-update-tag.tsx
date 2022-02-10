import { useQueryClient, useMutation } from "react-query";
import { UpdateTagsInput, UpdateTagsMutation } from "API";
import { API } from "aws-amplify";
import { updateTags } from "graphql/mutations";
import { Tags } from "models";
import { useAuth } from "presentation/context/auth-context";

const updateTag = async (tagInput: UpdateTagsInput) => {
  const tagResponse = (await API.graphql({
    query: updateTags,
    variables: {
      input: tagInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: UpdateTagsMutation };
  if (tagResponse.data) return tagResponse.data.updateTags;
};

export const useUpdateTag = (callback?: (tag: Tags) => void) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (input: Omit<UpdateTagsInput, "tenant">) => {
      return updateTag({ ...input, tenant: user.tenant });
    },
    {
      onSuccess: (tag, variables) => {
        queryClient.invalidateQueries(["tags"]);
        if (callback) callback(tag as Tags);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
