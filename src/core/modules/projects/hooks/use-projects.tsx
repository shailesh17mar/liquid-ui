import { ListProjectsQuery } from "API";
import { API } from "aws-amplify";
import { listProjects } from "graphql/queries";
import { Projects } from "models";
import { useQuery } from "react-query";

const retrieveProjects = async () => {
  const projectsResponse = (await API.graphql({ query: listProjects })) as {
    data: ListProjectsQuery;
  };
  if (projectsResponse.data && projectsResponse.data.listProjects) {
    return projectsResponse.data.listProjects.items as Projects[];
  }
};

export const useProjects = () => {
  return useQuery("projects", retrieveProjects);
};
