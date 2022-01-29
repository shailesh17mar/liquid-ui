import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreateTranscriptionInput, CreateTranscriptionMutation } from "API";
import { Transcription } from "models";
import { createTranscription } from "graphql/mutations";

const createTranscript = async (transcriptInput: CreateTranscriptionInput) => {
  const transcriptResponse = (await API.graphql({
    query: createTranscription,
    variables: {
      input: transcriptInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: CreateTranscriptionMutation };
  debugger;
  if (transcriptResponse.data)
    return transcriptResponse.data.createTranscription;
};

export const useCreateTranscription = (
  callback?: (transcript: Transcription) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: CreateTranscriptionInput) => {
      return createTranscript(input);
    },
    {
      onSuccess: (transcript, variables) => {
        if (Boolean(transcript)) {
          queryClient.invalidateQueries(["transcripts"]);
          if (callback) callback(transcript as Transcription);
        }
      },
      onError: (error) => {
        debugger;
        console.log("what happened?");
      },
    }
  );
};
