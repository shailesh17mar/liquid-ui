import { StoryRepository } from "../infrastructure/story-repository.interface";
import { Stories as Story } from "models";
import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export class StoryMutationController {
  constructor(private readonly storyRepository: StoryRepository) {}

  async createStory(story: ModelInit<Story>): Promise<Story> {
    return await this.storyRepository.create(story);
  }

  async updateStory(
    id: string,
    story: Partial<ModelInit<Story>>
  ): Promise<Story | undefined> {
    return await this.storyRepository.update(id, story);
  }

  async deleteStory(id: string): Promise<void> {
    await this.storyRepository.delete(id);
  }
}
