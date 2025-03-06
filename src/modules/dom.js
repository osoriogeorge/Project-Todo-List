import { projectRenderer } from "./projectRenderer";
import { taskRenderer } from "./taskRenderer";

export const dom = {
  render(projectList) {
    const projectsSection = this.getProjectsSection();
    if (!projectsSection) return;
    projectsSection.innerHTML = "";

    const projectForm = projectRenderer.createProjectForm(
      projectList,
      this.render.bind(this)
    );
    projectsSection.appendChild(projectForm);

    const projectListDiv = projectRenderer.createProjectList(
      projectList,
      this.renderTasks.bind(this),
      this.render.bind(this)
    );
    projectsSection.appendChild(projectListDiv);
  },

  renderTasks(project, projectIndex) {
    const tasksSection = this.getTasksSection();
    if (!tasksSection) return;
    tasksSection.innerHTML = "";

    const taskForm = taskRenderer.createTaskForm(
      project,
      projectIndex,
      this.renderTasks.bind(this)
    );
    tasksSection.appendChild(taskForm);

    const taskListDiv = taskRenderer.createTaskList(
      project,
      this.renderTasks.bind(this)
    );
    tasksSection.appendChild(taskListDiv);
  },

  getRootElement() {
    const root = document.getElementById("root");
    if (!root) {
      console.error("Root element not found in the DOM.");
    }
    return root;
  },

  getProjectsSection() {
    const projectsSection = document.getElementById("projects-section");
    if (!projectsSection) {
      console.error("Projects-section element not found in the DOM.");
    }
    return projectsSection;
  },

  getTasksSection() {
    const tasksSection = document.getElementById("tasks-section");
    if (!tasksSection) {
      console.error("Tasks-section element not found in the DOM.");
    }
    return tasksSection;
  },
};
