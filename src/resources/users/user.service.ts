import * as usersRepo from './user.memory.repository';
import * as tasksRepo from '../tasks/task.memory.repository';
import {IUserData} from "./user.model";

/**
 * @description Get all Users
 *
 * @return Promise list of the Users
 */
export const getAll = (): Promise<Array<IUserData>> => usersRepo.getAll();
/**
 * @description Get User by id
 *
 * @param id string
 *
 * @return Promise User | false
 */
export const get = (id: string): Promise<IUserData|false> => usersRepo.get(id);
/**
 * @description Create User
 *
 * @param name string
 * @param login string
 * @param pass string
 *
 * @return Promise created User | false
 */
export const create = (name: string, login: string, pass: string): Promise<IUserData> => usersRepo.create(name, login, pass);
/**
 * @description Update User
 * @param id string
 * @param name string|undefined
 * @param login string|undefined
 * @param pass string|undefined
 *
 * @return Promise updatedUser | false
 */
export const update = (id: string, name: string|undefined = undefined, login: string|undefined = undefined, pass: string|undefined = undefined): Promise<IUserData|false> => usersRepo.update(id, {
    ...(name ? { name } : {}),
    ...(login ? { login } : {}),
    ...(pass ? { pass } : {}),
})
/**
 * @description Delete User
 *
 * @param id string
 *
 * @return Promise deleted User | bool
 */
export const remove = async (id: string): Promise<IUserData|false> => {
    const result = await usersRepo.remove(id);

    if (result) {
        await tasksRepo.updateBatch({ userId: id }, { userId: null })
    }

    return result
}
