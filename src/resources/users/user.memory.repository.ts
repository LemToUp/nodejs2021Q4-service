import {UserModel, IUserData} from "./user.model";

const { v4: uuidv4 } = require('uuid');

const data: Array<IUserData> = [];
/**
 * @description Get Users list
 *
 * @return Promise Array of users;
 */
export const getAll = async (): Promise<Array<IUserData>> => data;
/**
 * @description Get User by id
 *
 * @param id User id string
 *
 * @return Promise User | false;
 */
export const get = async (id: string): Promise<IUserData | false> => data.find((user) => user.id === id) || false;
/**
 * @description Create User
 *
 * @param name User name string
 * @param login User login string
 * @param password User password string
 *
 * @return Promise new User
 */
export const create = async (name: string, login: string, password: string): Promise<IUserData> => {
  const user = new UserModel({ id: uuidv4(), name, login, password });
  data.push(user);

  return user;
}
/**
 * @description Update User
 *
 * @param id User id string
 * @param fields Fields for update
 *
 * @return Promise updated User | false
 */
export const update = async (id: string, fields: IUserData): Promise<IUserData | false> => {
  const index = data.findIndex((user) => user.id === id);

  if (index === -1) return false;

  data[index] = {
    ...data[index],
    ...fields,
  }

  return data[index];
}
/**
 * @description Delete User
 * @param id User id string
 *
 * @return Promise Boolean result
 */
export const remove = async (id: string): Promise<IUserData | false> => {
  const index = data.findIndex((user) => user.id === id);

  if (index !== -1) {
    return data.splice(index, 1)[0];
  }

  return false;
}
