import {IColumnData, ColumnModel} from "./column.model";

const { v4: uuidv4 } = require('uuid');

const data: Array<IColumnData> = [];
/**
 * @description Get Columns list
 *
 * @return Promise Array of Columns;
 */
export const getAll = async (): Promise<Array<IColumnData>> => data;
/**
 * @description Get Column by id
 *
 * @param id Column id string
 *
 * @return Promise Column | false;
 */
export const get = async (id: string): Promise<IColumnData|false> => data.find((column) => column.id === id) || false;
/**
 * @description Create Column
 *
 * @param title Column title string
 * @param order Column order string
 *
 * @return Promise new Column
 */
export const create = async (title: string, order: string): Promise<IColumnData> => {
  const column = new ColumnModel({ id: uuidv4(), title, order });
  data.push(column);

  return column;
}
/**
 * @description Update Column
 *
 * @param id Column id string
 * @param fields Fields for update
 *
 * @return Promise updated Column | false
 */
export const update = async (id: string, fields: IColumnData): Promise<IColumnData|false> => {
  const index = data.findIndex((column) => column.id === id);

  if (index === -1) return false;

  data[index] = {
    ...data[index],
    ...fields,
  }

  return data[index];
}
/**
 * @description Delete Column
 * @param id Column id string
 *
 * @return Promise Boolean result
 */
export const remove = async (id: string): Promise<IColumnData|false> => {
  const index = data.findIndex((column) => column.id === id);

  if (index !== -1) {
    return data.splice(index, 1)[0];
  }

  return false;
}
