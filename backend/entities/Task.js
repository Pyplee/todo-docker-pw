class Task {
  constructor(title, description, cardId, isComplited = false) {
    this.id = Task.id;
    Task.id += 1;
    this.title = title;
    this.description = description;
    this.cardId = cardId;
    this.isComplited = isComplited;
  }

  getId() {
    return this.id;
  }

  getCardId() {
    return this.cardId;
  }

  changeComplit() {
    this.isComplited =!this.isComplited;
  }

  getIsComplited() {
    return this.isComplited;
  }
}

Task.id = 1;

export default Task;
