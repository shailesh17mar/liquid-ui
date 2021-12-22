import { ModelInit } from "@aws-amplify/datastore";
import { Categories as Category } from "models";

export interface CategoryRepository {
  getAllByProjectId(projectId: string): Promise<Category[] | undefined>;
  create(category: ModelInit<Category>): Promise<Category>;
  update(
    id: string,
    category: Partial<ModelInit<Category>>
  ): Promise<Category | undefined>;
  delete(id: string): void;
}
