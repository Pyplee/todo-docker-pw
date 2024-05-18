class Task {
  constructor(title, description, cardId, complite = false) {
    this.id = Task.id;
    Task.id += 1;
    this.title = title;
    this.description = description;
    this.cardId = cardId;
    this.complite = complite;
  }

  getId() {
    return this.id;
  }

  getCardId() {
    return this.cardId;
  }
}

Task.id = 1;

export default Task;
