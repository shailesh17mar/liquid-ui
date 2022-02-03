import { useQueryClient, useMutation } from "react-query";
import { UpdateProjectsInput, UpdateProjectsMutation } from "API";
import { API } from "aws-amplify";
import { updateProjects } from "graphql/mutations";

const updateProject = async (projectInput: UpdateProjectsInput) => {
  const projectResponse = (await API.graphql({
    query: updateProjects,
    variables: {
      input: projectInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: UpdateProjectsMutation };
  if (projectResponse.data) return projectResponse.data.updateProjects;
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: Omit<UpdateProjectsInput, "tenant">) => {
      return updateProject(input);
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
