import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import pino from 'pino';
import logger from '../common/logger';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
    constructor(private pinoLogger: pino.Logger = logger) {
        super();
        this.setLogLevels(['log', 'debug', 'error', 'verbose', 'warn']);
    }

    log(message: string) {
        this.pinoLogger.trace(message);
    }

    error(message: string) {
        this.pinoLogger.error(message);
    }

    warn(message: string) {
        this.pinoLogger.warn(message);
    }

    debug(message: string) {
        this.pinoLogger.debug(message);
    }

    verbose(message: string) {
        this.pinoLogger.trace(message);
    }

    info<T>(obj: T, message: string) {
        this.pinoLogger.trace(obj, message);
    }
}

