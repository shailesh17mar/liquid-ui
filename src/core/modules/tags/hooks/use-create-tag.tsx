import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreateTagsInput, CreateTagsMutation } from "API";
import { createTags } from "graphql/mutations";
import { Tags } from "models";
import { useAuth } from "presentation/context/auth-context";

const createTag = async (tagInput: CreateTagsInput) => {
  const tagResponse = (await API.graphql({
    query: createTags,
    variables: {
      input: tagInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: CreateTagsMutation };
  if (tagResponse.data) return tagResponse.data.createTags;
};

export const useCreateTag = (callback?: (tag: Tags) => void) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (input: Omit<CreateTagsInput, "tenant">) => {
      return createTag({ ...input, tenant: user.tenant });
    },
    {
      onSuccess: (tag, variables) => {
        if (Boolean(tag)) {
          queryClient.invalidateQueries(["tags"]);
          if (callback) callback(tag as Tags);
        }
      },
      onError: (error) => {
        console.log("what happened?");
      },
    }
  );
};
