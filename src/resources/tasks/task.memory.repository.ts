import {ITaskData, TaskModel} from "./task.model";
import { compareConditions } from "../../common/repository";

const { v4: uuidv4 } = require('uuid');

const data: Array<ITaskData> = [];
/**
 * @description Get Tasks by board Id
 *
 * @return Promise Array of Tasks;
 */
export const getByBoardId = async (boardId: string) => data.filter((task) => task.boardId === boardId);
/**
 * @description Get Task by id
 *
 * @param id Task id string
 *
 * @return Promise Task | false;
 */
export const get = async (id: string) => data.find((task) => task.id === id) || false;
/**
 * @description Create Task
 *
 * @param title Task title string
 * @param order Task order string
 * @param description Task description string
 * @param userId Task userId string
 * @param boardId Task @param boardId Task columns string string
 * @param columnId Task columnId string
 *
 * @return Promise new Task
 */
export const create = async (title: string, order: string, description: string, userId: string, boardId: string, columnId: string) => {
  const task = new TaskModel({ id: uuidv4(), title, order, description, userId, boardId, columnId });
  data.push(task);

  return task;
}
/**
 * @description Update Task
 *
 * @param id Task id string
 * @param fields Fields for update
 *
 * @return Promise updated Task | false
 */
export const update = async (id: string | undefined, fields: ITaskData) => {
  const index = data.findIndex((task) => task.id === id);

  if (index === -1) return false;

  data[index] = {
    ...data[index],
    ...fields,
  }

  return data[index];
}
/**
 * @description Mass update by conditions
 *
 * @param conditions Conditions for the task rows
 * @param fields Fields for update
 *
 * @return Promise updated Tasks list | empty array
 */
export const updateBatch = async (conditions: ITaskData, fields: ITaskData) => {
  const tasks = data.filter((task) => compareConditions(task, conditions));

  const promises: Array<Promise<ITaskData|false>> = [];
  tasks.forEach((task) => {
    promises.push(update(task.id, fields));
  })

  if (promises.length === 0) return [];

  await Promise.all(promises);

  return data.filter((task) => compareConditions(task, conditions));
}
/**
 * @description Delete Task
 * @param value Column value
 * @param column Column for deletion search
 *
 * @return Promise Boolean result
 */
export const remove = async (value: string | undefined, column: keyof ITaskData = 'id') => {
  const index = data.findIndex((task) => task[column] === value);

  if (index !== -1) {
    return data.splice(index, 1)[0];
  }

  return false;
}
/**
 * @description Mass delete Tasks
 * @param conditions Conditions for delete
 *
 * @return Promise Boolean result
 */
export const removeBatch = async (conditions: ITaskData) => {
  const tasks = data.filter((task) => compareConditions(task, conditions));

  const promises: Array<Promise<ITaskData|false>> = [];
  tasks.forEach((task) => {
    promises.push(remove(task.id));
  })

  if (promises.length === 0) return [];

  const deletedTasks = await Promise.all(promises);

  return deletedTasks;
}
