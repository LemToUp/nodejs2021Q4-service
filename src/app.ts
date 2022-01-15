import fastify from "fastify";
import { userRoute } from "./resources/users/user.router";
import { taskRoute } from "./resources/tasks/task.router";
import { boardRoute } from "./resources/boards/board.router";
import loggerHandler from "./loggers/handler";

const fastifyInstance = fastify()

fastifyInstance.register(userRoute, { prefix: '/users'});
fastifyInstance.register(boardRoute, { prefix: '/boards'});
fastifyInstance.register(taskRoute, { prefix: '/boards/:boardId/tasks'});

loggerHandler(fastifyInstance);

export const server = fastifyInstance;
