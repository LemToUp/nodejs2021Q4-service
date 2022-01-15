export type IColumnData = {
  id?: string,
  title?: string,
  order?: string,
};

/**
 * @class Column model definition
 */
export class ColumnModel {
  id: string | undefined;

  title: string | undefined;

  order: string | undefined;

  /**
   * @description Column model constructor
   * @param id sting
   * @param title string
   * @param order string
   */
  constructor({
    id,
    title,
    order,
  }: IColumnData = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
