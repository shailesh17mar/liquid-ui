import { CategoryRepository } from "../infrastructure/category-repository.interface";
import { Categories as Category } from "models";
import { ModelInit } from "@aws-amplify/datastore";

export class CategoryMutationController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(category: ModelInit<Category>): Promise<Category> {
    return await this.categoryRepository.create(category);
  }

  async updateCategory(
    id: string,
    category: Partial<ModelInit<Category>>
  ): Promise<Category | undefined> {
    return await this.categoryRepository.update(id, category);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
