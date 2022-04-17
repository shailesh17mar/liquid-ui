import { ListTagCategoriesQuery, ModelTagCategoryFilterInput } from "API";
import { API } from "aws-amplify";

import { TagCategory } from "API";
import { listTagCategories } from "graphql/queries";
import { useQuery } from "react-query";

const retrieveCategories = async (projectId: string) => {
  const categoriesResponse = (await API.graphql({
    query: listTagCategories,
    variables: {
      filter: {
        projectsID: { eq: projectId },
      } as ModelTagCategoryFilterInput,
    },
  })) as {
    data: ListTagCategoriesQuery;
  };
  if (categoriesResponse.data && categoriesResponse.data.listTagCategories) {
    return (
      categoriesResponse.data.listTagCategories.items as Required<TagCategory>[]
    ).sort(
      (a, b) =>
        new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
    );
  }
};

export const useTagCategories = (projectId: string) => {
  return useQuery(["tag-categories-project"], () =>
    retrieveCategories(projectId)
  );
};
