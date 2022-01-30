import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardModel } from './board.model';
import { ColumnModel } from '../column/column.model';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardModel)
        private boardRepository: Repository<BoardModel>
    ) {}


    /**
     * @description Get all Boards
     *
     * @return Promise list of the Boards
     */
    getAll() {
        return this.boardRepository.find({ relations: ['columns'] })
    };

    /**
     * @description Get Board by id
     *
     * @param id string
     * @param relations
     *
     * @return Promise Board | false
     */
    get(id: string, relations: Array<string> = []) {
        return this.boardRepository.findOne({
            where: { id },
            relations,
        })
    };

    /**
     * @description Create Board
     *
     * @param title string
     * @param columns string
     *
     * @return Promise created Board | false
     */
    create(title: string, columns: Array<{ title: string, order: number}>) {
        const boardModel = new BoardModel();

        boardModel.title = title;
        boardModel.columns = columns
        ? columns.map(column => {
            const columnModel = new ColumnModel();
            columnModel.title = column.title;
            columnModel.order = column.order;

            return columnModel;
        })
        : boardModel.columns;

        return this.boardRepository.save(boardModel);
    }

    /**
     * @description Update Board
     * @param id string
     * @param title string|undefined
     *
     * @return Promise updatedBoard | false
     */
    async update(id: string, title?: string) {
        const boardModel = await this.get(id);

        if (boardModel) {
            await this.boardRepository.update(id, {
                title: title || boardModel.title,
            })

            return this.get(id, ['columns']);
        }

        return false;
    }

    /**
     * @description Delete Board
     *
     * @param id string
     *
     * @return Promise Board | false
     */
    async remove(id: string) {
        const boardModel = await this.get(id);
        if (boardModel) {
            await this.boardRepository.delete(id);

            return boardModel;
        }

        return false;
    }
}
