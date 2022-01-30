import {FastifyInstance} from 'fastify';
import { requestLogger } from './requestLogger';
import { errorLogger } from './errorLogger';
import { uncaughtExceptionLogger } from './uncaughtExceptionLogger';
import { unhandledRejectionLogger } from './unhandledRejectionLogger';

export default (fastifyInstance: FastifyInstance) => {
    requestLogger(fastifyInstance);
    errorLogger(fastifyInstance);
    uncaughtExceptionLogger();
    unhandledRejectionLogger();
};
