export type IUserData = { id?: string, name?: string, login?: string, password?: string };
/**
 * @class User model definition
 */
export class UserModel {
  id: string | undefined;

  name: string | undefined;

  login: string | undefined;

  password: string | undefined;

  /**
   * @description User model constructor
   * @param id sting
   * @param title string
   * @param login string
   * @param password string
   */
  constructor({
    id,
    name,
    login,
    password
  }: IUserData = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * @description Serialize User to the response data
   * @param user model data
   *
   * @return serialized User
   */
  static toResponse(user: IUserData) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
