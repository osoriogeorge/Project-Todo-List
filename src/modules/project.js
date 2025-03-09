import Todo from "./todo.js";

export default class Project {
  constructor(name, todos = []) {
    this.name = name;

    this.todos = todos.map((t) =>
      t instanceof Todo
        ? t
        : new Todo(t.title, t.description, t.dueDate, t.priority, t.completed)
    );
    this.createdAt = new Date().toISOString();
  }

  static exists(projectName) {
    return this.getAll().some(
      (p) => p.name.toLowerCase() === projectName.toLowerCase()
    );
  }

  static getAll() {
    return JSON.parse(localStorage.getItem("projects")) || [];
  }

  static get(name) {
    const projectData = this.getAll().find((p) => p.name === name);
    return projectData
      ? new Project(projectData.name, projectData.todos)
      : null;
  }

  static delete(name) {
    const updatedProjects = this.getAll().filter((p) => p.name !== name);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  }

  save() {
    const projects = Project.getAll();
    const existingIndex = projects.findIndex((p) => p.name === this.name);

    if (existingIndex >= 0) {
      projects[existingIndex] = this;
    } else {
      projects.push(this);
    }

    localStorage.setItem("projects", JSON.stringify(projects));
  }

  addTodo(todoData) {
    if (!(todoData instanceof Todo)) {
      const newTodo = new Todo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority,
        todoData.completed || false
      );

      if (!this.todos.some((t) => t.title === newTodo.title)) {
        this.todos.push(newTodo);
        return true;
      }
      return false;
    }

    if (!this.todos.some((t) => t.title === todoData.title)) {
      this.todos.push(todoData);
      return true;
    }
    return false;
  }

  deleteTodo(todoTitle) {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter((t) => t.title !== todoTitle);
    return this.todos.length < initialLength;
  }
}
