import * as columnsRepo from './column.memory.repository';
/**
 * @description Get all Columns
 *
 * @return list of the Columns
 */
export const getAll = () => columnsRepo.getAll();
/**
 * @description Get Column by id
 *
 * @param id string
 *
 * @return Column | false
 */
export const get = (id: string) => columnsRepo.get(id);
/**
 * @description Create Column
 *
 * @param title string
 * @param order string
 *
 * @return created Column | false
 */
export const create = (title: string, order: string) => columnsRepo.create(title, order);
/**
 * @description Update Column
 * @param id string
 * @param title string|undefined
 * @param order string|undefined
 *
 * @return updatedColumn | false
 */
export const update = (id: string, title: string | null = null, order: string | null = null) => columnsRepo.update(id, {
    ...(title ? { title } : {}),
    ...(order ? { order } : {}),
})
/**
 * @description Delete Column
 *
 * @param id string
 *
 * @return result bool
 */
export const remove = (id: string) => columnsRepo.remove(id);
