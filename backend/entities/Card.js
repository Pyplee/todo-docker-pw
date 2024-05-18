class Card {
  constructor(title) {
    this.id = Card.id;
    Card.id += 1;
    this.title = title;
    this.tasksId = [];
  }

  addTask(taskId) {
    this.tasksId.push(taskId);
  }

  getId() {
    return this.id;
  }

  removeTask(taskId) {
    this.tasksId = this.tasksId.filter((id) => id!== taskId);
  }

  addMoretasksId(arr) {
    this.tasksId = this.tasksId.concat(arr);
  }

  getTasksId() {
    return this.tasksId;
  }
}

Card.id = 1;

export default Card;
