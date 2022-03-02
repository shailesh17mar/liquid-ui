import {
  GetTagCategoryQuery,
  ListCategoriesQuery,
  ListTagCategoriesQuery,
  ModelTagCategoryFilterInput,
  TagCategory,
} from "API";
import { API } from "aws-amplify";
import { getTagCategory } from "graphql/queries";
import { useQuery } from "react-query";

const retrieveCategoryById = async (id: string) => {
  const categoryResponse = (await API.graphql({
    query: getTagCategory,
    variables: {
      id,
    },
  })) as { data: GetTagCategoryQuery };
  if (categoryResponse.data) {
    return categoryResponse.data.getTagCategory;
  }
};

const retrieveDefaultCategory = async (projectId: string) => {
  const categoriesResponse = (await API.graphql({
    query: getTagCategory,
    variables: {
      filter: {
        projectsID: { eq: projectId },
        label: { eq: "Uncategorized" },
      } as ModelTagCategoryFilterInput,
    },
  })) as { data: ListTagCategoriesQuery };
  if (
    categoriesResponse &&
    categoriesResponse.data &&
    categoriesResponse.data.listTagCategories
  ) {
    return categoriesResponse.data.listTagCategories
      .items[0] as Required<TagCategory>;
  }
  return null;
};

export const useTagCategory = (id: string, enabled: boolean = true) => {
  return useQuery(["tag-categories", id], () => retrieveCategoryById(id), {
    enabled,
  });
};

export const useDefaultTagCategory = (projectId: string) =>
  useQuery(["tag-categories", projectId], () =>
    retrieveDefaultCategory(projectId)
  );
