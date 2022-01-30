import {FastifyInstance} from 'fastify';
import bcrypt from 'bcryptjs';
import {UserService} from '../users/user.service';

export class LoginService {
    fastify: FastifyInstance;

    userService: UserService;

    constructor(fastify: FastifyInstance) {
        this.fastify = fastify;
        this.userService = new UserService();
    }

    async getToken(login: string, password: string): Promise<string | false> {
        const user = await this.userService.getByLogin(login);

        if (!user || !user.password) return false;

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) return false;

        return this.fastify.jwt.sign({
            sub: user.id,
            userId: user.id,
            login: user.login,
        }, {
            expiresIn: '1h'
        })
    }
}
