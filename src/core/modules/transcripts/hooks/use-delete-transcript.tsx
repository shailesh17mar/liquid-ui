import { DeleteTranscriptionInput, DeleteTranscriptionMutation } from "API";
import { API } from "aws-amplify";
import { deleteTranscription } from "graphql/mutations";
import { useMutation, useQueryClient } from "react-query";

const deleteTranscript = async (id: string) => {
  const transcriptResponse = (await API.graphql({
    query: deleteTranscription,
    variables: {
      input: {
        id,
      } as DeleteTranscriptionInput,
    },
  })) as { data: DeleteTranscriptionMutation };
  if (transcriptResponse.data)
    return transcriptResponse.data.deleteTranscription;
};

export const useDeleteTranscript = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => {
      return deleteTranscript(id);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["transcripts"]);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
