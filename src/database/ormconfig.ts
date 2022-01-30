import {ConnectionOptions} from 'typeorm';
import { UserModel } from '../resources/users/user.model';
import { BoardModel } from '../resources/boards/board.model';
import { ColumnModel } from '../resources/column/column.model';
import { TaskModel } from '../resources/tasks/task.model';

export default {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [ UserModel, BoardModel, ColumnModel, TaskModel ],
    migrations: [
        'src/database/migrations/*.ts',
    ],
    cli: {
        migrationsDir: 'src/database/migrations',
    },
    synchronize: false,
} as ConnectionOptions;
