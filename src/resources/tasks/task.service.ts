import * as tasksRepo from './task.memory.repository';
/**
 * @description Get Task by BoardId
 *
 * @param boardId string
 *
 * @return Task | false
 */
export const getByBoardId = (boardId: string) => tasksRepo.getByBoardId(boardId);
/**
 * @description Get Task by id
 *
 * @param id string
 *
 * @return Task | false
 */
export const get = (id: string) => tasksRepo.get(id);
/**
 * @description Create Task
 *
 * @param title string
 * @param order string
 * @param description string
 * @param userId string
 * @param boardId string
 * @param columnId string
 *
 * @return created Task | false
 */
export const create = (title: string, order: string, description: string, userId: string, boardId: string, columnId: string) => tasksRepo.create(title, order, description, userId, boardId, columnId);
/**
 * @description Update Task
 * @param id string
 * @param title string|undefined
 * @param order string|undefined
 * @param description string|undefined
 * @param userId string|undefined
 * @param boardId string|undefined
 * @param columnId string|undefined
 *
 * @return updatedTask | false
 */
export const updateById = (
    id: string,
    title: string | null = null,
    order: string | null = null,
    description: string | null = null,
    userId: string | null = null,
    boardId: string | null = null,
    columnId: string | null = null
) => tasksRepo.update(id, {
    ...(title ? { title } : {}),
    ...(order ? { order } : {}),
    ...(description ? { description } : {}),
    ...(userId ? { userId } : {}),
    ...(boardId ? { boardId } : {}),
    ...(columnId ? { columnId } : {}),
});
/**
 * @description Delete Task
 *
 * @param id string
 *
 * @return result bool
 */
export const remove = (id: string) => tasksRepo.remove(id);
