class Column {
  constructor({
    id,
    title,
    order,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(board) {
    const { id, title, order } = board;
    return { id, title, order };
  }
}

module.exports = Column;
