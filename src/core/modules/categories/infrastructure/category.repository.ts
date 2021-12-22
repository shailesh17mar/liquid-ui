import { MutableModel, ModelInit } from "@aws-amplify/datastore";
import { DataStore } from "aws-amplify";
import { Categories as Category } from "models";
import { CategoryRepository } from "./category-repository.interface";

export class CategoryRepositoryImpl implements CategoryRepository {
  async getAllByProjectId(projectId: string): Promise<Category[]> {
    const projects = await DataStore.query(Category);
    return projects;
  }

  async create(category: MutableModel<Category>): Promise<Category> {
    const newProject = await DataStore.save(category);
    return newProject;
  }

  async update(
    id: string,
    category: Partial<ModelInit<Category>>
  ): Promise<Category | undefined> {
    const original = await DataStore.query(Category, id);
    if (original) {
      const updatedProject = await DataStore.save(
        Category.copyOf(original, (updated) => {
          // updated.readme = category.readme;
          // updated.name = category.name || original.name;
        })
      );
      return updatedProject;
    }
  }

  async delete(id: string): Promise<void> {
    const category = await DataStore.query(Category, id);
    if (category) await DataStore.delete(category);
  }
}
