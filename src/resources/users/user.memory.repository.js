const { v4: uuidv4 } = require('uuid');
const User = require('./user.model');

const data = [];

const getAll = async () => data;

const get = async (id) => data.find((user) => user.id === id) || false;

const create = async (name, login, password) => {
  const user = new User({ id: uuidv4(), name, login, password });
  data.push(user);

  return user;
}

const update = async (id, fields) => {
  const index = data.findIndex((user) => user.id === id);

  if (index === -1) return false;

  data[index] = {
    ...data[index],
    ...fields,
  }

  return data[index];
}

const remove = async (id) => {
  const index = data.findIndex((user) => user.id === id);

  if (index !== -1) {
    return data.splice(index, 1)[0];
  }

  return false;
}


module.exports = { getAll, get, create, update, remove };
