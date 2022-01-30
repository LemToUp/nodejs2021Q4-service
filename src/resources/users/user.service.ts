import bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserModel)
        private userRepository: Repository<UserModel>
    ) {}

    /**
     * @description Get all Users
     *
     * @return Promise list of the Users
     */
    getAll() {
        return this.userRepository.find();
    }

    /**
     * @description Get User by id
     *
     * @param id string
     *
     * @return Promise User | false
     */
    get(id: string) {
        return this.userRepository.findOne(id);
    }

    getByLogin(login: string) {
        return this.userRepository.findOne({ where: { login } })
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
                password: password ? bcrypt.hashSync(password, 10) : userModel.password,
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
