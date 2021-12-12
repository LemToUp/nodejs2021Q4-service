import * as usersRepo from './user.memory.repository';
import * as tasksRepo from '../tasks/task.memory.repository';

/**
 * @description Get all Users
 *
 * @return list of the Users
 */
export const getAll = () => usersRepo.getAll();
/**
 * @description Get User by id
 *
 * @param id string
 *
 * @return User | false
 */
export const get = (id: string) => usersRepo.get(id);
/**
 * @description Create User
 *
 * @param name string
 * @param login string
 * @param pass string
 *
 * @return created User | false
 */
export const create = (name: string, login: string, pass: string) => usersRepo.create(name, login, pass);
/**
 * @description Update User
 * @param id string
 * @param name string|undefined
 * @param login string|undefined
 * @param pass string|undefined
 *
 * @return updatedUser | false
 */
export const update = (id: string, name: string|undefined = undefined, login: string|undefined = undefined, pass: string|undefined = undefined) => usersRepo.update(id, {
    ...(name ? { name } : {}),
    ...(login ? { login } : {}),
    ...(pass ? { pass } : {}),
})
/**
 * @description Delete User
 *
 * @param id string
 *
 * @return result bool
 */
export const remove = async (id: string) => {
    const result = await usersRepo.remove(id);

    if (result) {
        await tasksRepo.updateBatch({ userId: id }, { userId: null })
    }

    return result
}
