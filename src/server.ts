import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fmp from 'fastify-multipart';
import { AppModule } from './app.module';
import { LoggerService } from './loggers/logger.service.';
import { unhandledRejectionLogger } from './loggers/unhandledRejectionLogger';
import { uncaughtExceptionLogger } from './loggers/uncaughtExceptionLogger';


require('dotenv').config();

const { PORT, ADDRESS } = require('./common/config');

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        { bufferLogs: true },
    );

    app.useLogger(new LoggerService());
    await app.register(fmp);

    unhandledRejectionLogger();
    uncaughtExceptionLogger();

    await app.listen(PORT, ADDRESS)
}

bootstrap();
