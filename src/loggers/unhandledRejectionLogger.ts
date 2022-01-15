import logger from "../common/logger";

export const unhandledRejectionLogger = () => {
    process.on('unhandledRejection', (reason) => {
        logger.error({
            message: reason instanceof Error ? reason.message : reason,
        }, 'unhandledRejection');
    });
}
