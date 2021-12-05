const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository')

const getAll = () => boardsRepo.getAll();
const get = (id) => boardsRepo.get(id);
const create = (title, columns) => boardsRepo.create(title, columns);
const update = (id, title = null, columns = null) => boardsRepo.update(id, {
    ...(title ? { title } : {}),
    ...(columns ? { columns } : {}),
})
const remove = async (id) => {
    const result = await boardsRepo.remove(id);

    if (result) {
        await tasksRepo.removeBatch({ boardId: id });
    }

    return result;
}

module.exports = { getAll, get, create, update, remove };
