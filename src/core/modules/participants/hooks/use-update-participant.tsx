import { useQueryClient, useMutation } from "react-query";
import { UpdatePersonsInput, UpdatePersonsMutation } from "API";
import { API } from "aws-amplify";
import { updatePersons } from "graphql/mutations";
import { Persons } from "models";

const updatePerson = async (personInput: UpdatePersonsInput) => {
  const personResponse = (await API.graphql({
    query: updatePersons,
    variables: {
      input: personInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: UpdatePersonsMutation };
  if (personResponse.data) return personResponse.data.updatePersons;
};

export const useUpdatePerson = (callback?: (person: Persons) => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: UpdatePersonsInput) => {
      return updatePerson(input);
    },
    {
      onSuccess: (person, variables) => {
        queryClient.invalidateQueries(["persons"]);
        if (callback) callback(person as Persons);
      },
      onError: () => {
        console.log("what happened?");
      },
    }
  );
};
