const { v4: uuidv4 } = require('uuid');
const { compareConditions } = require('../../common/repository')
const Task = require('./task.model');

const data = [];

const getByBoardId = async (boardId) => data.filter((task) => task.boardId === boardId);

const get = async (id) => data.find((task) => task.id === id) || false;

const create = async (title, order, description, userId, boardId, columnId) => {
  const task = new Task({ id: uuidv4(), title, order, description, userId, boardId, columnId });
  data.push(task);

  return task;
}

const update = async (id, fields) => {
  const index = data.findIndex((task) => task.id === id);

  if (index === -1) return false;

  data[index] = {
    ...data[index],
    ...fields,
  }

  return data[index];
}

const updateBatch = async (conditions, fields) => {
  const tasks = data.filter((task) => compareConditions(task, conditions));

  const promises = [];
  tasks.forEach((task) => {
    promises.push(update(task.id, fields));
  })

  if (promises.length === 0) return [];

  await Promise.all(promises);

  return data.filter((task) => compareConditions(task, conditions));
}

const remove = async (value, column = 'id') => {
  const index = data.findIndex((task) => task[column] === value);

  if (index !== -1) {
    return data.splice(index, 1)[0];
  }

  return false;
}

const removeBatch = async (conditions) => {
  const tasks = data.filter((task) => compareConditions(task, conditions));

  const promises = [];
  tasks.forEach((task) => {
    promises.push(remove(task.id));
  })

  if (promises.length === 0) return [];

  const deletedTasks = await Promise.all(promises);

  return deletedTasks;
}


module.exports = { getByBoardId, get, create, update, updateBatch, remove, removeBatch };
