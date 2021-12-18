import { ProjectRepository } from "../infrastructure/project-repository.interface";
import { Projects as Project } from "models";
import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export class ProjectMutationController {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(project: ModelInit<Project>): Promise<Project> {
    return await this.projectRepository.create(project);
  }

  async updateProject(
    id: string,
    project: MutableModel<Project>
  ): Promise<Project> {
    return await this.projectRepository.update(id, project);
  }

  async deleteProject(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
