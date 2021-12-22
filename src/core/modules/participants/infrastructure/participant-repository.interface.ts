import { ModelInit, MutableModel } from "@aws-amplify/datastore";
import { Persons as Person } from "models";

export interface ParticipantRepository {
  getAllByProjectId(projectId: string): Promise<Person[]>;
  getById(id: string): Promise<Person | undefined>;
  create(project: ModelInit<Person>): Promise<Person>;
  update(
    id: string,
    project: Partial<ModelInit<Person>>
  ): Promise<Person | undefined>;
  delete(id: string): void;
}
