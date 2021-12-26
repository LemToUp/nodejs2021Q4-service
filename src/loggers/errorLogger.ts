import {FastifyInstance} from "fastify";
import logger from "../common/logger";

export const errorLogger = (fastifyInstance: FastifyInstance) => {
    fastifyInstance.addHook('onError', (req, reply, error, done) => {
        logger.error({
            statusCode: error.statusCode,
            message: error.message
        }, 'Error log');

        reply.type('application/json');
        reply.code(500);
        reply.send(JSON.stringify(error.message));

        done();
    })
}
