import { GetProjectsQuery } from "API";
import { API } from "aws-amplify";
import { getProjects } from "graphql/queries";
import { useQuery } from "react-query";

const retrieveProjectById = async (id: string) => {
  const projectResponse = (await API.graphql({
    query: getProjects,
    variables: {
      id,
    },
  })) as { data: GetProjectsQuery };
  if (projectResponse.data) {
    const project = projectResponse.data.getProjects;
    if (project?.readme)
      return { ...project, readme: JSON.parse(project?.readme) };
  }
};

export const useProject = (id: string) => {
  return useQuery(["projects", id], () => retrieveProjectById(id));
};
