import {FastifyInstance} from 'fastify';
import logger from '../common/logger';

export const requestLogger = (fastifyInstance: FastifyInstance) => {
    fastifyInstance.addHook('onResponse', (req, reply, done) => {
        logger.info({
            url: req.url,
            queryParameters: req.query,
            bodyParameters: req.params,
            body: req.body,
            statusCode: reply.statusCode
        }, 'Request log');

        done()
    })
}
