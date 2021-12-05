const columnsRepo = require('./column.memory.repository');

const getAll = () => columnsRepo.getAll();
const get = (id) => columnsRepo.get(id);
const create = (title, order) => columnsRepo.create(title, order);
const update = (id, title = null, order = null) => columnsRepo.update(id, {
    ...(title ? { title } : {}),
    ...(order ? { order } : {}),
})
const remove = (id) => columnsRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
