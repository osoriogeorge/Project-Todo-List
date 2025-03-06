import Task from "./task";

export class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  getTasks() {
    return [...this.tasks];
  }

  getTask(index) {
    return this.tasks[index];
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
  }
}
