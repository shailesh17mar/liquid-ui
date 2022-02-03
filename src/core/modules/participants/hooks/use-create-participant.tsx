import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreatePersonsInput, CreatePersonsMutation } from "API";
import { createPersons } from "graphql/mutations";
import { Persons } from "models";
import { useAuth } from "presentation/context/auth-context";

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
  const { user } = useAuth();
  return useMutation(
    (input: Omit<CreatePersonsInput, "tenant">) => {
      return createPerson({ ...input, tenant: user.tenant });
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
