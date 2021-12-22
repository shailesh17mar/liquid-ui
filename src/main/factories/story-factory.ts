import { ModelInit } from "@aws-amplify/datastore";
import { ParticipantRepositoryImpl } from "core/modules/participants/infrastructure/participant.repository";
import { ParticipantMutationController } from "core/modules/participants/usecases/participant-mutation-controller";
import { ParticipantsQueryController } from "core/modules/participants/usecases/participant-query-controller";
import { StoryRepositoryImpl } from "core/modules/stories/infrastructure/story.repository";
import { StoryMutationController } from "core/modules/stories/usecases/story-mutation-controller";
import { StoriesQueryController } from "core/modules/stories/usecases/story-query-controller";
import { Stories as Story, Persons as Participant } from "models";

export const makeStoriesQueryController = (): StoriesQueryController =>
  new StoriesQueryController(new StoryRepositoryImpl());

export const makeStoryMutationController = (): StoryMutationController =>
  new StoryMutationController(new StoryRepositoryImpl());

export interface StoryController {
  getStoryById: (id: string) => Promise<Story | undefined>;
  updateStory: (
    id: string,
    story: Partial<ModelInit<Story>>
  ) => Promise<Story | undefined>;
}
export const makeStoryController = (): StoryController => {
  const storyRepository = new StoryRepositoryImpl();
  const storyQueryController = new StoriesQueryController(storyRepository);
  const storyMutationController = new StoryMutationController(storyRepository);

  return {
    getStoryById: (id: string) => storyQueryController.getById(id),
    updateStory: (id: string, story: Partial<ModelInit<Story>>) =>
      storyMutationController.updateStory(id, story),
  };
};

export interface ParticipantController {
  getParticipantById: (id: string) => Promise<Participant | undefined>;
  updateParticipant: (
    id: string,
    project: Partial<ModelInit<Participant>>
  ) => Promise<Participant | undefined>;
  createParticipant: (project: ModelInit<Participant>) => Promise<Participant>;
}
export const makeParticipantController = (): ParticipantController => {
  const participantRepository = new ParticipantRepositoryImpl();
  const participantQueryController = new ParticipantsQueryController(
    participantRepository
  );
  const participantMutationController = new ParticipantMutationController(
    participantRepository
  );

  return {
    getParticipantById: (id: string) => participantQueryController.getById(id),
    createParticipant: (participant: ModelInit<Participant>) =>
      participantMutationController.createParticipant(participant),
    updateParticipant: (id: string, participant: ModelInit<Participant>) =>
      participantMutationController.updateParticipant(id, participant),
  };
};
