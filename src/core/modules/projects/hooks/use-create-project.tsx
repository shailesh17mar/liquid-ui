import { API } from "aws-amplify";
import { useQueryClient, useMutation } from "react-query";
import { CreateProjectsInput, CreateProjectsMutation } from "API";
import { createProjects } from "graphql/mutations";
import { Projects } from "models";
import { useAuth } from "presentation/context/auth-context";

const createProject = async (projectInput: CreateProjectsInput) => {
  const projectResponse = (await API.graphql({
    query: createProjects,
    variables: {
      input: projectInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as { data: CreateProjectsMutation };
  if (projectResponse.data) return projectResponse.data.createProjects;
};

export const useCreateProject = (callback: (project: Projects) => void) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (input: Omit<CreateProjectsInput, "tenant">) => {
      return createProject({ ...input, tenant: user.tenant });
    },
    {
      onSuccess: (project, variables) => {
        if (Boolean(project)) {
          queryClient.invalidateQueries(["projects"]);
          callback(project as Projects);
        }
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
