import {
  Categories,
  ListCategoriesQuery,
  ModelCategoriesFilterInput,
} from "API";
import { API } from "aws-amplify";
import { listCategories } from "graphql/queries";
import { useQuery } from "react-query";

const retrieveCategories = async (projectId: string) => {
  const categoriesResponse = (await API.graphql({
    query: listCategories,
    variables: {
      filter: {
        projectsID: { eq: projectId },
      } as ModelCategoriesFilterInput,
    },
  })) as {
    data: ListCategoriesQuery;
  };
  if (categoriesResponse.data && categoriesResponse.data.listCategories) {
    return (
      categoriesResponse.data.listCategories.items as Required<Categories>[]
    ).sort(
      (a, b) =>
        new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
    );
  }
};

export const useCategories = (projectId: string) => {
  return useQuery(["categories"], () => retrieveCategories(projectId));
};
