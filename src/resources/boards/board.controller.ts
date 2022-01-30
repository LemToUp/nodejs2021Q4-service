import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardModel } from './board.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const boards = await this.boardService.getAll();
    // map board fields to exclude secret fields like "password"
    return boards.map(BoardModel.toResponse);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':boardId')
  async findOne(@Param('boardId') boardId: string) {
    const board = await this.boardService.get(boardId, ['columns']);

    if (!board) throw new HttpException('Board not found', 404);
    // map board fields to exclude secret fields like "password"
    return BoardModel.toResponse(board);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body:  { title: string, columns: Array<{ title: string, order: number}> }) {
    const { title, columns } = body;
    const board = await this.boardService.create(title, columns);

    return BoardModel.toResponse(board);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':boardId')
  async update(@Param('boardId') boardId: string, @Body() body: { title: string }) {
    const { title } = body;

    let boardModel = await this.boardService.get(boardId);

    await this.boardService.update(boardId, title);

    if (boardModel) {
      boardModel = await this.boardService.get(boardId);
    }

    if (!boardModel) throw new HttpException('Board not found', 404);

    return BoardModel.toResponse(boardModel);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':boardId')
  async delete(@Param('boardId') boardId: string) {
    const board = await this.boardService.remove(boardId);

    if (!board) throw new HttpException('Board not found', 404);
    // map board fields to exclude secret fields like "password"
    return BoardModel.toResponse(board);
  }
}
