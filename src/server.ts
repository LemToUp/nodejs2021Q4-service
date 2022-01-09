import { server } from "./app";

require('dotenv').config();

const { PORT, ADDRESS }: { PORT: number, ADDRESS: string } = require('./common/config');


server.listen(PORT || 4000, ADDRESS).catch((err: Error) => {
    server.log.error(err);
    process.exit(1);
})
