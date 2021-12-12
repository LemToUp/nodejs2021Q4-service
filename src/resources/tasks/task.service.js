const tasksRepo = require('./task.memory.repository');

const getByBoardId = (boardId) => tasksRepo.getByBoardId(boardId);

const get = (id) => tasksRepo.get(id);

const create = (title, order, description, userId, boardId, columnId) => tasksRepo.create(title, order, description, userId, boardId, columnId);

const updateById = (
    id,
    title = null,
    order = null,
    description = null,
    userId = null,
    boardId = null,
    columnId = null
) => tasksRepo.update(id, {
    ...(title ? { title } : {}),
    ...(order ? { order } : {}),
    ...(description ? { description } : {}),
    ...(userId ? { userId } : {}),
    ...(boardId ? { boardId } : {}),
    ...(columnId ? { columnId } : {}),
});

const remove = (id) => tasksRepo.remove(id);

module.exports = { getByBoardId, get, create, updateById, remove };
