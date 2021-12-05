class Task {
  constructor({
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(board) {
    const { id = null, title = null, order = null, description = null, userId = null, boardId = null, columnId = null } = board;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
