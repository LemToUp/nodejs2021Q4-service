import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { LoggerService } from '../loggers/logger.service.';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    constructor(private loggerService: LoggerService) {}

    use(req: FastifyRequest, res: FastifyReply, next: () => void, ) {
        this.loggerService.info({
            url: req.url,
            queryParameters:req.query,
            bodyParameters: req.body,
            body: req.body,
            statusCode: res.statusCode
        }, 'Request log');
        next();
    }
}
