import Project from "./project.js";
import { todoRender } from "./tasksForm.js";

const projectSection = document.querySelector(".projects-section");

function createElement(tag, attributes = {}, textContent = "") {
  const element = document.createElement(tag);
  Object.assign(element, attributes);
  if (textContent) element.textContent = textContent;
  return element;
}

function showFeedback(message, type = "success") {
  const feedback = createElement(
    "div",
    {
      className: `feedback ${type}`,
      style: "position: fixed; top: 20px; right: 20px; padding: 15px;",
    },
    message
  );

  document.body.appendChild(feedback);
  setTimeout(() => feedback.remove(), 3000);
}

function renderProjectList() {
  const projects = Project.getAll();
  const listProjects = createElement("ul", { className: "projects-list" });

  projects.forEach((project) => {
    const projectItem = createElement(
      "li",
      { className: "project-item" },
      project.name
    );

    const buttonsContainer = createElement("div", {
      className: "project-actions",
    });

    const addTaskBtn = createElement(
      "button",
      {
        className: "add-btn",
        title: "Añadir tarea",
      },
      "+"
    );

    const deleteProjectBtn = createElement(
      "button",
      {
        className: "delete-btn",
        title: "Eliminar proyecto",
      },
      "×"
    );

    // Eventos
    addTaskBtn.addEventListener("click", () => {
      todoRender(project.name); // Mostrar formulario de tareas
      showFeedback(`Proyecto activo: ${project.name}`);
    });

    deleteProjectBtn.addEventListener("click", () => {
      Project.delete(project.name);
      projectRender();
      showFeedback(`Proyecto "${project.name}" eliminado`, "error");
    });

    buttonsContainer.appendChild(addTaskBtn);
    buttonsContainer.appendChild(deleteProjectBtn);
    projectItem.appendChild(buttonsContainer);
    listProjects.appendChild(projectItem);
  });

  return listProjects;
}

function createProjectForm() {
  const form = createElement("form", {
    className: "project-form",
    autocomplete: "off",
  });

  const inputWrapper = createElement("div", { className: "input-group" });

  const input = createElement("input", {
    type: "text",
    placeholder: "Nuevo proyecto",
    required: true,
    minLength: 3,
    maxLength: 20,
  });

  const submitBtn = createElement(
    "button",
    {
      type: "submit",
      className: "primary-btn",
    },
    "Crear"
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectName = input.value.trim();

    if (!projectName) {
      input.focus();
      showFeedback("Nombre no válido", "error");
      return;
    }

    if (Project.exists(projectName)) {
      showFeedback("¡El proyecto ya existe!", "error");
      input.select();
      return;
    }

    new Project(projectName).save();
    input.value = "";
    projectRender();
    showFeedback(`Proyecto "${projectName}" creado`);
  });

  inputWrapper.appendChild(input);
  inputWrapper.appendChild(submitBtn);
  form.appendChild(inputWrapper);

  return form;
}

export function projectRender() {
  projectSection.innerHTML = "";

  projectSection.appendChild(createProjectForm());
  projectSection.appendChild(renderProjectList());
}
