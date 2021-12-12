const { v4: uuidv4 } = require('uuid');
const Column = require('./column.model');

const data = [];

const getAll = async () => data;

const get = async (id) => data.find((column) => column.id === id) || false;

const create = async (title, order) => {
  const column = new Column({ id: uuidv4(), title, order });
  data.push(column);

  return column;
}

const update = async (id, fields) => {
  const index = data.findIndex((column) => column.id === id);

  if (index === -1) return false;

  data[index] = {
    ...data[index],
    ...fields,
  }

  return data[index];
}

const remove = async (id) => {
  const index = data.findIndex((column) => column.id === id);

  if (index !== -1) {
    return data.splice(index, 1)[0];
  }

  return false;
}


module.exports = { getAll, get, create, update, remove };
