import { elementCreator } from "./elementCreator";
import { Task } from "./task";

export const taskRenderer = {
  createTaskList(project, renderTasks) {
    const taskList = document.createElement("ul");
    taskList.classList.add("task-list");

    const tasksHeader = document.createElement("h2");
    tasksHeader.textContent = "Tasks";
    taskList.before(tasksHeader);

    project.todoList.getTasks().forEach((task, index) => {
      const taskItem = this.createTaskItem(task, index, project, renderTasks);
      taskList.appendChild(taskItem);
    });

    return taskList;
  },

  createTaskItem(task, index, project, renderTasks) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    if (task.completed) {
      taskItem.classList.add("completed");
    }

    const taskArticle = document.createElement("article");
    taskArticle.classList.add("task");

    const checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("task-checkbox");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.toggleCompleted();
      renderTasks(project, project.id);
    });
    checkboxLabel.appendChild(checkbox);
    taskArticle.appendChild(checkboxLabel);

    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");

    const title = document.createElement("strong");
    title.textContent = task.title;
    taskDetails.appendChild(title);

    const description = document.createElement("p");
    description.textContent = `Description: ${task.description}`;
    taskDetails.appendChild(description);

    const dueDate = document.createElement("p");
    dueDate.textContent = `Due date: ${task.dueDate}`;
    taskDetails.appendChild(dueDate);

    const priority = document.createElement("p");
    priority.textContent = `Priority: ${task.priority}`;
    taskDetails.appendChild(priority);

    const notes = document.createElement("p");
    notes.textContent = `Notes: ${task.notes}`;
    taskDetails.appendChild(notes);

    taskArticle.appendChild(taskDetails);

    const deleteButton = elementCreator.createButton("Delete", "delete-btn");
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      project.todoList.deleteTask(index);
      renderTasks(project, project.id);
    });
    taskArticle.appendChild(deleteButton);

    taskItem.appendChild(taskArticle);
    return taskItem;
  },

  createTaskForm(project, projectIndex, renderTasks) {
    const taskForm = document.createElement("form");

    const titleInput = elementCreator.createInput("text", "Title");
    const descriptionInput = elementCreator.createInput("text", "Description");
    const dueDateInput = elementCreator.createInput("date", "");
    const prioritySelect = elementCreator.createPrioritySelect();
    const notesInput = elementCreator.createInput("text", "Notes");
    const addButton = elementCreator.createButton("Add task", "add-btn");

    taskForm.appendChild(titleInput);
    taskForm.appendChild(descriptionInput);
    taskForm.appendChild(dueDateInput);
    taskForm.appendChild(prioritySelect);
    taskForm.appendChild(notesInput);
    taskForm.appendChild(addButton);

    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTask = new Task(
        titleInput.value.trim(),
        descriptionInput.value.trim(),
        dueDateInput.value,
        prioritySelect.value,
        notesInput.value.trim()
      );
      if (newTask.title) {
        project.todoList.addTask(newTask);
        renderTasks(project, projectIndex);
      } else {
        alert("The task title cannot be empty.");
      }
    });

    return taskForm;
  },
};
