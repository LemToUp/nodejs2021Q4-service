import * as boardsRepo from './board.memory.repository';
import * as tasksRepo from '../tasks/task.memory.repository';

/**
 * @description Get all Boards
 *
 * @return Promise list of the Boards
 */
export const getAll = () => boardsRepo.getAll();
/**
 * @description Get Board by id
 *
 * @param id string
 *
 * @return Promise Board | false
 */
export const get = (id: string) => boardsRepo.get(id);
/**
 * @description Create Board
 *
 * @param title string
 * @param columns string
 *
 * @return Promise created Board | false
 */
export const create = (title: string, columns: string) => boardsRepo.create(title, columns);
/**
 * @description Update Board
 * @param id string
 * @param title string|undefined
 * @param columns string|undefined
 *
 * @return Promise updatedBoard | false
 */
export const update = (id: string, title: string | undefined = undefined, columns: string | undefined = undefined) => boardsRepo.update(id, {
    ...(title ? { title } : {}),
    ...(columns ? { columns } : {}),
})
/**
 * @description Delete Board
 *
 * @param id string
 *
 * @return Promise Board | false
 */
export const remove = async (id: string) => {
    const result = await boardsRepo.remove(id);

    if (result) {
        await tasksRepo.removeBatch({ boardId: id });
    }

    return result;
}
