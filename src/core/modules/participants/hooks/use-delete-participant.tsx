import { DeletePersonsInput, DeletePersonsMutation } from "API";
import { API } from "aws-amplify";
import { deletePersons } from "graphql/mutations";
import { useMutation, useQueryClient } from "react-query";

const deletePerson = async (id: string) => {
  const personResponse = (await API.graphql({
    query: deletePersons,
    variables: {
      input: {
        id,
      } as DeletePersonsInput,
    },
  })) as { data: DeletePersonsMutation };
  if (personResponse.data) return personResponse.data.deletePersons;
};

export const useDeletePerson = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => {
      return deletePerson(id);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["persons"]);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
