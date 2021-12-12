import fastify from "fastify";
import { userRoute } from "./resources/users/user.router";
import { taskRoute } from "./resources/tasks/task.router";
import { boardRoute } from "./resources/boards/board.router";

const fastifyInstance = fastify(({ logger: true }))

fastifyInstance.register(userRoute, { prefix: '/users'});
fastifyInstance.register(boardRoute, { prefix: '/boards'});
fastifyInstance.register(taskRoute, { prefix: '/boards/:boardId/tasks'});

export const server = fastifyInstance;
