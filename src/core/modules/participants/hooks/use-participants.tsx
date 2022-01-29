import { ListPersonsQuery, ModelPersonsFilterInput } from "API";
import { API } from "aws-amplify";
import { listPersons } from "graphql/queries";
import { Persons } from "models";
import { useQuery } from "react-query";

const retrievePersons = async (projectId?: string) => {
  const personsResponse = (await API.graphql({
    query: listPersons,
    variables: projectId
      ? {
          filter: {
            projectsID: { eq: projectId },
          } as ModelPersonsFilterInput,
        }
      : undefined,
  })) as {
    data: ListPersonsQuery;
  };
  if (personsResponse.data && personsResponse.data.listPersons) {
    return personsResponse.data.listPersons.items as Persons[];
  }
};

export const usePersons = (projectId?: string, enabled: boolean = true) => {
  return useQuery("persons", () => retrievePersons(projectId), { enabled });
};
