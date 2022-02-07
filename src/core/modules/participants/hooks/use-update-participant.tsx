import { useQueryClient, useMutation } from "react-query";
import { UpdatePersonsInput, UpdatePersonsMutation } from "API";
import { API } from "aws-amplify";
import { updatePersons } from "graphql/mutations";
import { Persons } from "models";
import { useAuth } from "presentation/context/auth-context";

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
  const { user } = useAuth();
  return useMutation(
    (input: Omit<UpdatePersonsInput, "tenant">) => {
      return updatePerson({ ...input, tenant: user.tenant });
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
