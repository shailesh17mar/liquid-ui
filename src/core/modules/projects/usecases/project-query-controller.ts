import { ProjectRepository } from "../infrastructure/project-repository.interface";
import { Projects as Project } from "models";

export class ProjectsQueryController {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async getAll(): Promise<Project[]> {
    const projects = await this.projectRepository.getAll();
    return projects;
  }

  async getById(id: string): Promise<Project | undefined> {
    const project = await this.projectRepository.getById(id);
    return project;
  }
}
