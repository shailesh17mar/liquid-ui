import { GetPersonsQuery } from "API";
import { API } from "aws-amplify";
import { getPersons } from "graphql/queries";
import { useQuery } from "react-query";

const retrievePersonById = async (id: string) => {
  const personResponse = (await API.graphql({
    query: getPersons,
    variables: {
      id,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: GetPersonsQuery };
  if (personResponse.data) {
    return personResponse.data.getPersons;
  }
};

export const usePerson = (id: string) => {
  return useQuery(["persons", id], () => retrievePersonById(id));
};
