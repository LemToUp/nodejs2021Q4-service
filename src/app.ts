import fastify, {FastifyReply, FastifyRequest} from 'fastify';
import fastifyJwt from 'fastify-jwt';
import { userRoute } from './resources/users/user.router';
import { taskRoute } from './resources/tasks/task.router';
import { boardRoute } from './resources/boards/board.router';
import loggerHandler from './loggers/handler';
import {getConnection} from './database/db';

require('dotenv').config();

const fastifyInstance = fastify();

fastifyInstance.register(fastifyJwt, {
    secret: process.env.SECRET as string
})

fastifyInstance.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
})

fastifyInstance.register(userRoute, { prefix: '/users'});
fastifyInstance.register(boardRoute, { prefix: '/boards'});
fastifyInstance.register(taskRoute, { prefix: '/boards/:boardId/tasks'});

loggerHandler(fastifyInstance);

export const initializeApp =  async () => {
    await getConnection();

    return fastifyInstance;
}
