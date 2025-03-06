import { TodoList } from "./todoList.js";

export class Project {
  constructor(name) {
    this.name = name;
    this.todoList = new TodoList();
  }

  getName() {
    return this.name;
  }
}
