import { MutableModel, ModelInit } from "@aws-amplify/datastore";
import { API, DataStore } from "aws-amplify";
import { updateStories } from "graphql/mutations";
import { Persons, Stories as Story } from "models";
import { sampleStory, sampleStory2 } from "./data";
import { StoryRepository } from "./story-repository.interface";

export class StoryRepositoryImpl implements StoryRepository {
  async getAllByProjectId(projectId: string): Promise<Story[]> {
    const stories = await DataStore.query(Story);
    return stories;
  }

  async getById(id: string): Promise<Story | undefined> {
    const original = await DataStore.query(Story, id);
    return original;
    // const story = sampleStory;
    // const updatedStory = await DataStore.save(
    //   Story.copyOf(original!!, (updated) => {
    //     updated.title = story.title;
    //     updated.content = story.content;
    //     updated.participants = story.participants;
    //     updated.content = story.content;
    //     updated.transcription = story.transcription;
    //     // updated.readme = story.readme;
    //     // updated.name = story.name || original.name;
    //   })
    // );
    // return updatedStory;
  }

  async create(story: MutableModel<Story>): Promise<Story> {
    const newProject = await DataStore.save(story);
    return newProject;
  }

  async update(
    id: string,
    story: Partial<ModelInit<Story>>
  ): Promise<Story | undefined> {
    // await API.graphql({
    //   query: updateStories,
    //   variables:{
    //     input
    //   }
    //     authMode: "AMAZON_COGNITO_USER_POOLS",
    // })
    const original = await DataStore.query(Story, id);
    if (original) {
      const updatedStory = await DataStore.save(
        Story.copyOf(original, (updated) => {
          updated.title = story.title || original.title;
          updated.content = story.content || original.content;
          updated.participants = story.participants;
          updated.content = story.content;
          updated.transcription = story.transcription;
          // updated.readme = story.readme;
          // updated.name = story.name || original.name;
        })
      );
      return updatedStory;
    }
  }

  async delete(id: string): Promise<void> {
    const story = await DataStore.query(Story, id);
    if (story) await DataStore.delete(story);
  }
}
