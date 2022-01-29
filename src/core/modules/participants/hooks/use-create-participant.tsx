import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreatePersonsInput, CreatePersonsMutation } from "API";
import { createPersons } from "graphql/mutations";
import { Persons } from "models";

const createPerson = async (personInput: CreatePersonsInput) => {
  const personResponse = (await API.graphql({
    query: createPersons,
    variables: {
      input: personInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: CreatePersonsMutation };
  debugger;
  if (personResponse.data) return personResponse.data.createPersons;
};

export const useCreatePerson = (callback?: (person: Persons) => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: CreatePersonsInput) => {
      return createPerson(input);
    },
    {
      onSuccess: (person, variables) => {
        if (Boolean(person)) {
          queryClient.invalidateQueries(["persons"]);
          if (callback) callback(person as Persons);
        }
      },
      onError: (error) => {
        debugger;
        console.log("what happened?");
      },
    }
  );
};
