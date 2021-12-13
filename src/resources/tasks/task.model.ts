export type ITaskData = {
  id?: string,
  title?: string,
  order?: string,
  description?: string,
  userId?: string | null,
  boardId?: string,
  columnId?: string,
};
/**
 * @class Task model definition
 */
export class TaskModel {
  id: string | undefined;

  title: string | undefined;

  order: string | undefined;

  description: string | undefined;

  userId: string | null |  undefined;

  boardId: string | undefined;

  columnId: string | undefined;

  /**
   * @description Task model constructor
   *
   * @param id sting
   * @param title string
   * @param order string
   * @param description string
   * @param userId string
   * @param boardId string
   * @param columnId string
   */
  constructor({
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: ITaskData = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * @description Serialize Task to the response data
   * @param task model data
   *
   * @return serialized Task
   */
  static toResponse(task: ITaskData): Partial<ITaskData> {
    const { id = undefined, title = undefined, order = undefined, description = undefined, userId = null, boardId = undefined, columnId = undefined } = task;

    return { id, title, order, description, userId, boardId, columnId };
  }
}
