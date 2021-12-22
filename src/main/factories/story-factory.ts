import { StoryRepositoryImpl } from "core/modules/stories/infrastructure/story.repository";
import { StoryMutationController } from "core/modules/stories/usecases/story-mutation-controller";
import { StoriesQueryController } from "core/modules/stories/usecases/story-query-controller";

export const makeStoriesQueryController = (): StoriesQueryController =>
  new StoriesQueryController(new StoryRepositoryImpl());

export const makeStoryMutationController = (): StoryMutationController =>
  new StoryMutationController(new StoryRepositoryImpl());
