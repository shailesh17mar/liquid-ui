import { StoriesQueryController } from "core/modules/stories/usecases/story-query-controller";
import {
  makeCategoryMutationController,
  makeCategoriesQueryController,
} from "main/factories/category-factory";
import {
  makeStoriesQueryController,
  makeStoryMutationController,
} from "main/factories/story-factory";
import { Stories } from "presentation/modules/stories";
import React from "react";

export const StoriesPage: React.FC = () => (
  <Stories
    storiesQueryController={makeStoriesQueryController()}
    storyMutationController={makeStoryMutationController()}
    categoriesQueryController={makeCategoriesQueryController()}
    categoryMutationController={makeCategoryMutationController()}
  />
);

export default StoriesPage;
