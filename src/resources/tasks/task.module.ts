import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModel } from './task.model';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserModule } from '../users/user.module';
import { BoardModule } from '../boards/board.module';
import { ColumnModule } from '../column/column.module';

@Module({
    imports: [
        BoardModule,
        ColumnModule,
        UserModule,
        TypeOrmModule.forFeature([TaskModel])
    ],
    providers: [TaskService],
    controllers: [TaskController],
})
export class TaskModule {}
