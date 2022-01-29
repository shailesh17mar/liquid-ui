import { useQueryClient, useMutation } from "react-query";
import { UpdateTranscriptionInput, UpdateTranscriptionMutation } from "API";
import { API } from "aws-amplify";
import { updateTranscription } from "graphql/mutations";
import { Transcription } from "models";

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
  return useMutation(
    (input: UpdateTranscriptionInput) => {
      return updateTranscript(input);
    },
    {
      onSuccess: (transcript, variables) => {
        queryClient.invalidateQueries(["transcripts"]);
        if (callback) callback(transcript as Transcription);
      },
      onError: () => {
        console.log("what happened?");
      },
    }
  );
};
