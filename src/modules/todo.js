export default class Todo {
  constructor(title, description, dueDate, priority, completed = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.createdAt = new Date().toISOString();
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}
