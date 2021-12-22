import { StoryRepository } from "../infrastructure/story-repository.interface";
import { Stories as Story } from "models";

export class StoriesQueryController {
  constructor(private readonly storyRepository: StoryRepository) {}

  async getAllByProjectId(projectId: string): Promise<Story[]> {
    const stories = await this.storyRepository.getAllByProjectId(projectId);
    return stories;
  }

  async getById(id: string): Promise<Story | undefined> {
    const story = await this.storyRepository.getById(id);
    return story;
  }
}
