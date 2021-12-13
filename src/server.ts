import { server } from "./app";

const { PORT }: { PORT: number} = require('./common/config');

server.listen(PORT || 4000).catch((err: Error) => {
    server.log.error(err);
    process.exit(1);
})
