import { CategoryRepositoryImpl } from "core/modules/categories/infrastructure/category.repository";
import { CategoryMutationController } from "core/modules/categories/usecases/category-mutation-controller";
import { CategoriesQueryController } from "core/modules/categories/usecases/category-query-controller";

export const makeCategoriesQueryController = (): CategoriesQueryController =>
  new CategoriesQueryController(new CategoryRepositoryImpl());

export const makeCategoryMutationController = (): CategoryMutationController =>
  new CategoryMutationController(new CategoryRepositoryImpl());
