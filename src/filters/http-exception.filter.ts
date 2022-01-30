import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import logger from '../common/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();
        const status = exception.getStatus();

        logger.error({
            statusCode: exception.getStatus(),
            message: exception.message
        }, 'Error log');

        response
            .status(status)
            .send({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}
