import { ModelInit, MutableModel } from "@aws-amplify/datastore";
import { Stories as Story } from "models";

export interface StoryRepository {
  getAllByProjectId(projectId: string): Promise<Story[]>;
  getById(id: string): Promise<Story | undefined>;
  create(project: ModelInit<Story>): Promise<Story>;
  update(
    id: string,
    project: Partial<ModelInit<Story>>
  ): Promise<Story | undefined>;
  delete(id: string): void;
}
