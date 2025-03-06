import { elementCreator } from "./elementCreator";

export const projectRenderer = {
  createProjectList(projectList, renderTasks, renderProjects) {
    const projectListContainer = elementCreator.createDiv(
      "project-list-container"
    );

    const projectsHeader = document.createElement("h2");
    projectsHeader.textContent = "Projects";
    projectListContainer.appendChild(projectsHeader);

    const projectListUl = document.createElement("ul");
    projectListUl.classList.add("project-list");
    projectListContainer.appendChild(projectListUl);

    projectList.getProjects().forEach((project, index) => {
      const projectItemLi = document.createElement("li");
      projectItemLi.classList.add("project-item");

      const projectArticle = document.createElement("article");
      projectArticle.classList.add("project");

      const projectDiv = elementCreator.createDiv("project-name");
      projectDiv.textContent = project.getName();
      projectDiv.addEventListener("click", () => renderTasks(project, index));
      projectArticle.appendChild(projectDiv);

      const addButton = elementCreator.createButton(" + ", "add-btn");
      addButton.addEventListener("click", (e) => {
        e.stopPropagation();
        renderTasks(project, index);
      });
      projectArticle.appendChild(addButton);

      const deleteButton = elementCreator.createButton(" X ", "delete-btn");
      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        projectList.deleteProject(index);
        renderProjects(projectList);
      });
      projectArticle.appendChild(deleteButton);

      projectItemLi.appendChild(projectArticle);
      projectListUl.appendChild(projectItemLi);
    });

    return projectListContainer;
  },

  createProjectForm(projectList, renderProjects) {
    const projectForm = document.createElement("form");
    projectForm.classList.add("project-form");

    const projectNameInput = elementCreator.createInput("text", "Project name");
    projectNameInput.classList.add("project-name-input");

    const addButton = elementCreator.createButton("Add project", "add-btn");

    projectForm.appendChild(projectNameInput);
    projectForm.appendChild(addButton);

    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const projectName = projectNameInput.value.trim();
      if (projectName) {
        projectList.addProject(projectName);
        renderProjects(projectList);
      } else {
        alert("The project name cannot be empty.");
      }
    });

    return projectForm;
  },
};
