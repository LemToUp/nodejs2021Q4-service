import {IBoardData, BoardModel} from "./board.model";

const { v4: uuidv4 } = require('uuid');

const data: Array<IBoardData> = [];
/**
 * @description Get Boards list
 *
 * @return Promise Array of boards;
 */
export const getAll = async (): Promise<Array<IBoardData>> => data;
/**
 * @description Get Board by id
 *
 * @param id Board id string
 *
 * @return Promise Board | false;
 */
export const get = async (id: string): Promise<IBoardData|false> => data.find((board) => board.id === id) || false;
/**
 * @description Create Board
 *
 * @param title Board title string
 * @param columns Board columns string
 *
 * @return Promise new Board
 */
export const create = async (title: string, columns: string): Promise<IBoardData> => {
  const board = new BoardModel({ id: uuidv4(), title, columns });
  data.push(board);

  return board;
}
/**
 * @description Update Board
 *
 * @param id Board id string
 * @param fields Fields for update
 *
 * @return Promise updated Board | false
 */
export const update = async (id: string, fields: IBoardData): Promise<IBoardData|false> => {
  const index = data.findIndex((board) => board.id === id);

  if (index === -1) return false;

  data[index] = {
    ...data[index],
    ...fields,
  }

  return data[index];
}
/**
 * @description Delete Board
 * @param id Board id string
 *
 * @return Promise Boolean result
 */
export const remove = async (id: string): Promise<IBoardData|false> => {
  const index = data.findIndex((board) => board.id === id);

  if (index !== -1) {
    return data.splice(index, 1)[0];
  }

  return false;
}
