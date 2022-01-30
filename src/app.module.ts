import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DbModule } from './database/db';
import { UserModule } from './resources/users/user.module';
import { TaskModule } from './resources/tasks/task.module';
import { ColumnModule } from './resources/column/column.module';
import { BoardModule } from './resources/boards/board.module';
import { AuthModule } from './resources/auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { LoggerModule } from './loggers/logger.module';

@Module({
    imports: [
        DbModule,
        UserModule,
        TaskModule,
        ColumnModule,
        BoardModule,
        AuthModule,
        LoggerModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
