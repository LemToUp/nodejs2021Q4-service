const { PORT } = require('./common/config');
const fastify = require('./app');

fastify.listen(PORT || 4000).catch((err) => {
    fastify.log.error(err);
    process.exit(1);
})
