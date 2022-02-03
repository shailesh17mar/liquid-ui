import { DeleteProjectsInput, DeleteProjectsMutation } from "API";
import { API } from "aws-amplify";
import { deleteProjects } from "graphql/mutations";
import { useMutation, useQueryClient } from "react-query";

const deleteProject = async (id: string) => {
  const projectResponse = (await API.graphql({
    query: deleteProjects,
    variables: {
      input: {
        id,
      } as DeleteProjectsInput,
    },
  })) as { data: DeleteProjectsMutation };
  if (projectResponse.data) return projectResponse.data.deleteProjects;
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => {
      return deleteProject(id);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["projects"]);
      },
      onError: () => {
        console.log("what happened?");
      },
    }
  );
};
