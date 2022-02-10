import { GetCategoriesQuery } from "API";
import { API } from "aws-amplify";
import { getCategories } from "graphql/queries";
import { useQuery } from "react-query";

const retrieveCategoryById = async (id: string) => {
  const categoryResponse = (await API.graphql({
    query: getCategories,
    variables: {
      id,
    },
  })) as { data: GetCategoriesQuery };
  if (categoryResponse.data) {
    return categoryResponse.data.getCategories;
  }
};

export const useCategory = (id: string, enabled: boolean = true) => {
  return useQuery(["categories", id], () => retrieveCategoryById(id), {
    enabled,
  });
};
