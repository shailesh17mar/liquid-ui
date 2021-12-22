import {
  makeParticipantController,
  makeStoriesQueryController,
  makeStoryController,
  makeStoryMutationController,
} from "main/factories/story-factory";
import { StoryDetails } from "presentation/modules/stories";
import React from "react";
import { RecoilRoot, atom } from "recoil";

export interface Annotation {
  [key: string]: {
    type: string;
    tags: any[];
    position?: string;
  };
}
export const annotationState = atom<Annotation>({
  key: "annotationState",
  default: {},
});

export interface Story {
  id?: string;
  video?: string;
  annotations: Annotation;
}
export const storyState = atom<any>({
  key: "storyDetailsState",
  default: {},
});
export const StoryDetailsPage: React.FC = () => {
  return (
    <StoryDetails
      participantController={makeParticipantController()}
      storyController={makeStoryController()}
    />
  );
};

export default StoryDetailsPage;
