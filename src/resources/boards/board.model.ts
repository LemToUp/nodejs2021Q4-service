export type IBoardData = {
  id?: string,
  title?: string,
  columns?: string,
};


/**
 * @class Board model definition
 */
export class BoardModel {
  id: string | undefined;

  title: string | undefined;

  columns: string | undefined;

  /**
   * @description Board model constructor
   * @param id sting
   * @param title string
   * @param columns string
   */
  constructor({
    id,
    title,
    columns
  }: IBoardData = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * @description Serialize Board to the response data
   * @param board model data
   *
   * @return serialized Board
   */
  static toResponse(board: IBoardData) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
