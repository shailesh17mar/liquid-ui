import { MutableModel, ModelInit } from "@aws-amplify/datastore";
import { DataStore } from "aws-amplify";
import { Projects as Project } from "models";
import { ProjectRepository } from "./project-repository.interface";

export class ProjectRepositoryImpl implements ProjectRepository {
  async getAll(): Promise<Project[]> {
    const projects = await DataStore.query(Project);
    return projects;
  }

  async getById(id: string): Promise<Project | undefined> {
    const project = await DataStore.query(Project, id);
    return project;
  }

  async create(project: MutableModel<Project>): Promise<Project> {
    const newProject = await DataStore.save(project);
    return newProject;
  }

  async update(
    id: string,
    project: Partial<ModelInit<Project>>
  ): Promise<Project | undefined> {
    const original = await DataStore.query(Project, id);
    if (original) {
      const updatedProject = await DataStore.save(
        Project.copyOf(original, (updated) => {
          updated.readme = project.readme;
          updated.name = project.name || original.name;
        })
      );
      return updatedProject;
    }
  }

  async delete(id: string): Promise<void> {
    const project = await DataStore.query(Project, id);
    if (project) await DataStore.delete(project);
  }
}
