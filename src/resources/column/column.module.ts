import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnService } from './column.service';
import { ColumnModel } from './column.model';

@Module({
    imports: [TypeOrmModule.forFeature([ColumnModel])],
    providers: [ColumnService],
    exports: [ColumnService],
})
export class ColumnModule {}
