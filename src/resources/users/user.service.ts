import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { UserModel } from './user.model';


export class UserService {
    userRepository: UserRepository = getCustomRepository(UserRepository);

    /**
     * @description Get all Users
     *
     * @return Promise list of the Users
     */
    getAll() {
        return this.userRepository.getAll();
    }

    /**
     * @description Get User by id
     *
     * @param id string
     *
     * @return Promise User | false
     */
    get(id: string) {
        return this.userRepository.get(id);
    }

    getByLogin(login: string) {
        return this.userRepository.findOne({ where: { login }})
    }

    /**
     * @description Create User
     *
     * @return Promise created User | false
     */
    create(name: string, login: string, password: string) {
        const userModel = new UserModel();

        userModel.name = name;
        userModel.login = login;
        userModel.password = bcrypt.hashSync(password, 10);

        return this.userRepository.save(userModel);
    }

    /**
     * @description Update User
     * @param id string
     * @param name string|undefined
     * @param login string|undefined
     * @param password string|undefined
     *
     * @return Promise updatedUser | false
     */
    async update(
        id: string,
        name: string|undefined = undefined,
        login: string|undefined = undefined,
        password: string|undefined = undefined
    ) {
        const userModel = await this.get(id);

        if (userModel) {
            return this.userRepository.update(id, {
                name: name || userModel.name,
                login: login || userModel.login,
                password: password || userModel.password,
            });
        }

        return false;
    }

    /**
     * @description Delete User
     *
     * @param id string
     *
     * @return Promise deleted User | bool
     */
    async remove(id: string) {
        return this.userRepository.delete(id);
    }
}
