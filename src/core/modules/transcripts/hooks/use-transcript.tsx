import { GetTranscriptionQuery } from "API";
import { API } from "aws-amplify";
import { getTranscription } from "graphql/queries";
import { useQuery } from "react-query";

const retrieveTranscriptById = async (id: string) => {
  const transcriptResponse = (await API.graphql({
    query: getTranscription,
    variables: {
      id,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: GetTranscriptionQuery };
  if (transcriptResponse.data) {
    return transcriptResponse.data.getTranscription;
  }
};

export const useTranscript = (id: string) => {
  return useQuery(["transcripts", id], () => retrieveTranscriptById(id));
};
