import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnModel } from './column.model';

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnModel)
        private columnRepository: Repository<ColumnModel>
    ) {}

    /**
     * @description Get all Columns
     *
     * @return Promise list of the Columns
     */
    getAll() {
        return this.columnRepository.find()
    };

    /**
     * @description Get Column by id
     *
     * @param id string
     *
     * @return Promise Column | false
     */
    get(id: string) {
        return this.columnRepository.findOne(id)
    };

    /**
     * @description Create Column
     *
     * @param title string
     * @param order number
     *
     * @return Promise created Column | false
     */
    create(title: string, order: number) {
        const columnModel = new ColumnModel();

        columnModel.title = title;
        columnModel.order = order;

        return this.columnRepository.save(columnModel)
    };

    /**
     * @description Update Column
     * @param id string
     * @param title string|undefined
     * @param order number|undefined
     *
     * @return Promise updatedColumn | false
     */
    async update(id: string, title?: string, order?: number) {
        const columnModel = await this.get(id);

        if (columnModel) {
            return this.columnRepository.update(id, {
                title: title || columnModel.title,
                order: order || columnModel.order,
            })
        }

        return false;

    }

    /**
     * @description Delete Column
     *
     * @param id string
     *
     * @return Promise deleted column | false
     */
    remove(id: string) {
        return this.columnRepository.delete(id);
    };
}
