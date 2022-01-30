import { FastifyPluginAsync } from 'fastify';
import { response } from '../../common/response';
import {LoginService} from './login.service';

export const loginRoute:FastifyPluginAsync = async (fastify) => {
    const loginService = new LoginService(fastify);

    fastify.post('/', async (req, res) => {
        const { login, password } = req.body as { name: string, login: string, password: string };
        const token = await loginService.getToken(login, password);

        return response(res, token ? { token } : { message: 'Auth error' }, token ? 200 : 403);
    })
}
