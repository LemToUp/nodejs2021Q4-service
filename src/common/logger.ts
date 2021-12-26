import pino from "pino";
import path from "path";

require('dotenv').config();

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

const loggingLevel = process.env.LOGGING_LEVEL as keyof warningType;

const pinoInstance = pino({
    level: warningMap[loggingLevel] || 'trace',
    transport: {
        targets: [
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
        ]}
});

export default pinoInstance;
