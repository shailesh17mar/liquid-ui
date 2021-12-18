import { ProjectRepositoryImpl } from "core/modules/projects/infrastructure/project.repository";
import { ProjectMutationController } from "core/modules/projects/usecases/project-mutation-controller";
import { ProjectsQueryController } from "core/modules/projects/usecases/project-query-controller";

export const makeProjectQueryController = (): ProjectsQueryController =>
  new ProjectsQueryController(new ProjectRepositoryImpl());

export const makeProjectMutationController = (): ProjectMutationController =>
  new ProjectMutationController(new ProjectRepositoryImpl());
