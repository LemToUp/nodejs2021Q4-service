import { initializeApp } from './app';

require('dotenv').config();

const { PORT, ADDRESS }: { PORT: number, ADDRESS: string } = require('./common/config');

(async () => {
    const app = await initializeApp();

    app.listen(PORT || 4000, ADDRESS).catch((err: Error) => {
        app.log.error(err);
        process.exit(1);
    })
})();
