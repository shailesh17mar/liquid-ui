import { ModelInit, MutableModel } from "@aws-amplify/datastore";
import { Projects as Project } from "models";

export interface ProjectRepository {
  getAll(): Promise<Project[]>;
  getById(id: string): Promise<Project | undefined>;
  create(project: ModelInit<Project>): Promise<Project>;
  update(
    id: string,
    project: Partial<ModelInit<Project>>
  ): Promise<Project | undefined>;
  delete(id: string): void;
}
