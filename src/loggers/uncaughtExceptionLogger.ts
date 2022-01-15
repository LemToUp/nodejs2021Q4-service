import logger from "../common/logger";

export const uncaughtExceptionLogger = () => {
    process.on('uncaughtException', (err) => {
        logger.error(err.message, 'uncaughtException');
    });
}
