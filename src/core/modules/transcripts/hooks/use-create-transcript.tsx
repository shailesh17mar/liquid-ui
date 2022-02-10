import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreateTranscriptionInput, CreateTranscriptionMutation } from "API";
import { Transcription } from "models";
import { createTranscription } from "graphql/mutations";
import { useAuth } from "presentation/context/auth-context";

const createTranscript = async (transcriptInput: CreateTranscriptionInput) => {
  const transcriptResponse = (await API.graphql({
    query: createTranscription,
    variables: {
      input: transcriptInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: CreateTranscriptionMutation };
  if (transcriptResponse.data)
    return transcriptResponse.data.createTranscription;
};

export const useCreateTranscription = (
  callback?: (transcript: Transcription) => void
) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (input: Omit<CreateTranscriptionInput, "tenant">) => {
      return createTranscript({ ...input, tenant: user.tenant });
    },
    {
      onSuccess: (transcript, variables) => {
        if (Boolean(transcript)) {
          queryClient.invalidateQueries(["transcripts"]);
          if (callback) callback(transcript as Transcription);
        }
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
