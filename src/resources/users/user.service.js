const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();
const get = (id) => usersRepo.get(id);
const create = (name, login, pass) => usersRepo.create(name, login, pass);
const update = (id, name = null, login = null, pass = null) => usersRepo.update(id, {
    ...(name ? { name } : {}),
    ...(login ? { login } : {}),
    ...(pass ? { pass } : {}),
})
const remove = async (id) => {
    const result = await usersRepo.remove(id);

    if (result) {
        await tasksRepo.updateBatch({ userId: id }, { userId: null })
    }

    return result
}

module.exports = { getAll, get, create, update, remove };
