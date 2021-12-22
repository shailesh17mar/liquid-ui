import { CategoryRepository } from "../infrastructure/category-repository.interface";
import { Categories as Category } from "models";

export class CategoriesQueryController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAllByProjectId(projectId: string): Promise<Category[] | undefined> {
    const categories = await this.categoryRepository.getAllByProjectId(
      projectId
    );
    return categories;
  }
}
