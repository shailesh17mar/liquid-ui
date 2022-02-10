import { useQueryClient, useMutation } from "react-query";
import { UpdateTranscriptionInput, UpdateTranscriptionMutation } from "API";
import { API } from "aws-amplify";
import { updateTranscription } from "graphql/mutations";
import { Transcription } from "models";
import { useAuth } from "presentation/context/auth-context";

const updateTranscript = async (transcriptInput: UpdateTranscriptionInput) => {
  const transcriptResponse = (await API.graphql({
    query: updateTranscription,
    variables: {
      input: transcriptInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: UpdateTranscriptionMutation };
  if (transcriptResponse.data)
    return transcriptResponse.data.updateTranscription;
};

export const useUpdateTranscription = (
  callback?: (transcript: Transcription) => void
) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (input: Omit<UpdateTranscriptionInput, "tenant">) => {
      return updateTranscript({ ...input, tenant: user.tenant });
    },
    {
      onSuccess: (transcript, variables) => {
        queryClient.invalidateQueries(["transcripts"]);
        if (callback) callback(transcript as Transcription);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
