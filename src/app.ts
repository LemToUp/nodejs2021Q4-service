import fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';
import { userRoute } from './resources/users/user.router';
import { taskRoute } from './resources/tasks/task.router';
import { boardRoute } from './resources/boards/board.router';
import { loginRoute } from './resources/login/login.router'
import loggerHandler from './loggers/handler';
import { getConnection } from './database/db';
import { jwtAuth } from './common/jwt';

require('dotenv').config();

const fastifyInstance = fastify();

fastifyInstance.register(fastifyJwt, {
    secret: process.env.SECRET as string
})

fastifyInstance.decorate('authenticate', jwtAuth)

fastifyInstance.register(userRoute, { prefix: '/users'});
fastifyInstance.register(boardRoute, { prefix: '/boards'});
fastifyInstance.register(taskRoute, { prefix: '/boards/:boardId/tasks'});
fastifyInstance.register(loginRoute, { prefix: '/login'});

loggerHandler(fastifyInstance);

export const initializeApp =  async () => {
    await getConnection();

    return fastifyInstance;
}
