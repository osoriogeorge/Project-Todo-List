import { Project } from "./project.js";

export class ProjectList {
  constructor() {
    this.projects = [new Project("Project default")];
  }

  addProject(name) {
    this.projects.push(new Project(name));
  }

  getProjects() {
    return [...this.projects];
  }

  getProject(index) {
    return this.projects[index];
  }

  deleteProject(index) {
    this.projects.splice(index, 1);
  }
}
