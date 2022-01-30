import pino from 'pino';

import path = require('path')

type warningType = {
    '0': string,
    '1': string,
    '2': string,
    '3': string,
    '4': string,
}
const warningMap: warningType = {
    '0': 'error',
    '1': 'warn',
    '2': 'info',
    '3': 'debug',
    '4': 'trace',
}

const { LOGGING_LEVEL } = require('./config');

const loggingLevel = warningMap[LOGGING_LEVEL as keyof warningType] || 'trace';

const pinoInstance = pino({
    level: loggingLevel,
    transport: {
        targets: [
            {
                level: 'trace',
                target: 'pino-pretty',
                options: {},
            },
            {
                level: 'trace',
                target: 'pino/file',
                options: { destination: path.resolve(__dirname, '../../logs/log.log') },
            },
            {
                level: 'error',
                target: 'pino/file',
                options: { destination: path.resolve(__dirname, '../../logs/error.log') },
            }
        ] }
});

export default pinoInstance;
