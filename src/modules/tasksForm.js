import Project from "./project.js";
import Todo from "./todo.js";

const todosSection = document.querySelector(".todos-section");

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

function createTodoElement(todo, projectName) {
  const todoItem = createElement("li", { className: "todo-item" });
  const todoArticle = createElement("article", { className: "todo-article" });

  const todoTitle = createElement("h3", {}, todo.title);
  const todoDescription = createElement("p", {}, todo.description);
  const todoDueDate = createElement("p", {}, `Fecha límite: ${todo.dueDate}`);
  const todoPriority = createElement("p", {}, `Prioridad: ${todo.priority}`);

  const completedCheckbox = createElement("input", {
    type: "checkbox",
    checked: todo.completed,
    className: "completed-checkbox",
  });

  completedCheckbox.addEventListener("change", () => {
    const project = Project.get(projectName);
    const todoToUpdate = project.todos.find((t) => t.title === todo.title);
    if (todoToUpdate) {
      todoToUpdate.toggleCompleted();
      project.save();
    }
  });

  const deleteBtn = createElement(
    "button",
    {
      className: "delete-btn",
      title: "Eliminar tarea",
    },
    "×"
  );

  deleteBtn.addEventListener("click", () => {
    try {
      const project = Project.get(projectName);
      if (!project) throw new Error("Proyecto no encontrado");

      if (project.deleteTodo(todo.title)) {
        project.save();
        todoRender(projectName);
        showFeedback(`Tarea "${todo.title}" eliminada`, "success");
      } else {
        showFeedback("La tarea no existe o ya fue eliminada", "warning");
      }
    } catch (error) {
      showFeedback(error.message, "error");
    }
  });

  const completedContainer = createElement("label", {
    className: "completed-container",
  });
  completedContainer.appendChild(completedCheckbox);
  completedContainer.appendChild(createElement("span", {}, "Completada"));

  const actionsContainer = createElement("div", { className: "todo-actions" });
  actionsContainer.appendChild(completedContainer);
  actionsContainer.appendChild(deleteBtn);

  todoArticle.appendChild(todoTitle);
  todoArticle.appendChild(todoDescription);
  todoArticle.appendChild(todoDueDate);
  todoArticle.appendChild(todoPriority);
  todoArticle.appendChild(actionsContainer);
  todoItem.appendChild(todoArticle);

  return todoItem;
}

export function renderTasks(todos, projectName) {
  const listTodo = createElement("ul", { className: "todos-list" });

  todos.forEach((todo) => {
    listTodo.appendChild(createTodoElement(todo, projectName));
  });

  return listTodo;
}

export function handleTodosForm(projectName) {
  const form = createElement("form", {
    className: "todo-form",
    autocomplete: "off",
  });

  const fieldsContainer = createElement("div", { className: "form-grid" });

  const titleInput = createElement("input", {
    type: "text",
    placeholder: "Título de la tarea",
    required: true,
    minLength: 3,
    maxLength: 50,
  });

  const descriptionInput = createElement("textarea", {
    placeholder: "Descripción",
    rows: 3,
  });

  const dateInput = createElement("input", { type: "date" });
  dateInput.min = new Date().toISOString().split("T")[0];

  const prioritySelect = createElement("select");
  ["Baja", "Media", "Alta"].forEach((priority) => {
    prioritySelect.appendChild(
      createElement("option", { value: priority }, priority)
    );
  });

  const submitBtn = createElement(
    "button",
    {
      type: "submit",
      className: "primary-btn",
    },
    "Agregar Tarea"
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newTodo = new Todo(
      titleInput.value.trim(),
      descriptionInput.value.trim(),
      dateInput.value,
      prioritySelect.value
    );

    if (!newTodo.title) {
      showFeedback("El título es obligatorio", "error");
      titleInput.focus();
      return;
    }

    const project = Project.get(projectName);
    if (!project) {
      showFeedback("Proyecto no encontrado", "error");
      return;
    }

    if (
      project.todos.some(
        (t) => t.title.toLowerCase() === newTodo.title.toLowerCase()
      )
    ) {
      showFeedback("¡La tarea ya existe!", "error");
      titleInput.select();
      return;
    }

    project.addTodo(newTodo);
    project.save();

    form.reset();
    todoRender(projectName);
    showFeedback(`Tarea "${newTodo.title}" creada`);
  });

  fieldsContainer.appendChild(createFormField("Título:", titleInput));
  fieldsContainer.appendChild(
    createFormField("Descripción:", descriptionInput)
  );
  fieldsContainer.appendChild(createFormField("Fecha límite:", dateInput));
  fieldsContainer.appendChild(createFormField("Prioridad:", prioritySelect));
  form.appendChild(fieldsContainer);
  form.appendChild(submitBtn);

  return form;
}

function createFormField(labelText, inputElement) {
  const container = createElement("div", { className: "form-field" });
  const label = createElement("label", {}, labelText);
  container.appendChild(label);
  container.appendChild(inputElement);
  return container;
}

export function todoRender(projectName) {
  const project = Project.get(projectName);

  if (!project) {
    todosSection.innerHTML = "<p class='error'>Proyecto no encontrado</p>";
    return;
  }

  todosSection.innerHTML = "";

  const formTodos = handleTodosForm(projectName);
  const listTodos = renderTasks(project.todos, projectName);

  todosSection.appendChild(formTodos);
  todosSection.appendChild(listTodos);
}
