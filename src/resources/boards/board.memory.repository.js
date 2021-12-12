const { v4: uuidv4 } = require('uuid');
const Board = require('./board.model');

const data = [];

const getAll = async () => data;

const get = async (id) => data.find((board) => board.id === id) || false;

const create = async (title, columns) => {
  const board = new Board({ id: uuidv4(), title, columns });
  data.push(board);

  return board;
}

const update = async (id, fields) => {
  const index = data.findIndex((board) => board.id === id);

  if (index === -1) return false;

  data[index] = {
    ...data[index],
    ...fields,
  }

  return data[index];
}

const remove = async (id) => {
  const index = data.findIndex((board) => board.id === id);

  if (index !== -1) {
    return data.splice(index, 1)[0];
  }

  return false;
}


module.exports = { getAll, get, create, update, remove };
