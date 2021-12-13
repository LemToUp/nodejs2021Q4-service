import * as tasksRepo from './task.memory.repository';
import {ITaskData} from "./task.model";
/**
 * @description Get Task by BoardId
 *
 * @param boardId string
 *
 * @return Promise Task | false
 */
export const getByBoardId = (boardId: string): Promise<Array<ITaskData>> => tasksRepo.getByBoardId(boardId);
/**
 * @description Get Task by id
 *
 * @param id string
 *
 * @return Promise Task | false
 */
export const get = (id: string): Promise<ITaskData|false> => tasksRepo.get(id);
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
 * @return Promise created Task | false
 */
export const create = (title: string, order: string, description: string, userId: string, boardId: string, columnId: string): Promise<ITaskData> => tasksRepo.create(title, order, description, userId, boardId, columnId);
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
 * @return Promise updatedTask | false
 */
export const updateById = (
    id: string,
    title: string | null = null,
    order: string | null = null,
    description: string | null = null,
    userId: string | null = null,
    boardId: string | null = null,
    columnId: string | null = null
): Promise<ITaskData|false> => tasksRepo.update(id, {
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
 * @return Promise deleted Task | false
 */
export const remove = (id: string): Promise<ITaskData|false> => tasksRepo.remove(id);
