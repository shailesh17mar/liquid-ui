import { ListTranscriptionsQuery, ModelTranscriptionFilterInput } from "API";
import { API } from "aws-amplify";
import { listTranscriptions } from "graphql/queries";
import { Transcription } from "models";
import { useQuery } from "react-query";

const retrieveTranscription = async (projectId?: string) => {
  const transcriptsResponse = (await API.graphql({
    query: listTranscriptions,
    variables: projectId
      ? {
          filter: {
            projectsID: { eq: projectId },
          } as ModelTranscriptionFilterInput,
        }
      : undefined,
  })) as {
    data: ListTranscriptionsQuery;
  };
  if (transcriptsResponse.data && transcriptsResponse.data.listTranscriptions) {
    return transcriptsResponse.data.listTranscriptions.items as Transcription[];
  }
};

export const useTranscripts = (projectId?: string, enabled: boolean = true) => {
  return useQuery("transcripts", () => retrieveTranscription(projectId), {
    enabled,
  });
};
