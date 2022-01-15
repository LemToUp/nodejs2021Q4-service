import * as columnsRepo from './column.memory.repository';
import {IColumnData} from "./column.model";
/**
 * @description Get all Columns
 *
 * @return Promise list of the Columns
 */
export const getAll = (): Promise<Array<IColumnData>> => columnsRepo.getAll();
/**
 * @description Get Column by id
 *
 * @param id string
 *
 * @return Promise Column | false
 */
export const get = (id: string): Promise<IColumnData|false> => columnsRepo.get(id);
/**
 * @description Create Column
 *
 * @param title string
 * @param order string
 *
 * @return Promise created Column | false
 */
export const create = (title: string, order: string): Promise<IColumnData> => columnsRepo.create(title, order);
/**
 * @description Update Column
 * @param id string
 * @param title string|undefined
 * @param order string|undefined
 *
 * @return Promise updatedColumn | false
 */
export const update = (id: string, title: string | null = null, order: string | null = null): Promise<IColumnData|false> => columnsRepo.update(id, {
    ...(title ? { title } : {}),
    ...(order ? { order } : {}),
})
/**
 * @description Delete Column
 *
 * @param id string
 *
 * @return Promise deleted column | false
 */
export const remove = (id: string): Promise<IColumnData|false> => columnsRepo.remove(id);
