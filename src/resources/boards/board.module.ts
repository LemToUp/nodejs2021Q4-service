import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModel } from './board.model';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
    imports: [TypeOrmModule.forFeature([BoardModel])],
    providers: [BoardService],
    controllers: [ BoardController ],
    exports: [BoardService],
})
export class BoardModule {}
