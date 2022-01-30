import { ConnectionOptions } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../resources/users/user.model';
import { BoardModel } from '../resources/boards/board.model';
import { ColumnModel } from '../resources/column/column.model';
import { TaskModel } from '../resources/tasks/task.model';
import { UserService } from '../resources/users/user.service';

const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE
} = require('../common/config');

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: DB_HOST,
            port: DB_PORT ? parseInt(DB_PORT, 10) : 5432,
            username: DB_USER,
            password: DB_PASSWORD,
            database: DB_DATABASE,
            entities: [UserModel, BoardModel, ColumnModel, TaskModel],
            migrations: [
                'src/database/migrations/*.ts',
            ],
            cli: {
                migrationsDir: 'src/database/migrations',
            },
            synchronize: false,
            migrationsRun: true,
        } as ConnectionOptions),
        TypeOrmModule.forFeature([UserModel])
    ],
    providers: [ UserService ]
    }
)
export class DbModule {}
