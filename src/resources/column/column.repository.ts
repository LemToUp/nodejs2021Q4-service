import { EntityRepository, Repository } from 'typeorm';
import { ColumnModel } from './column.model';

@EntityRepository(ColumnModel)
export class ColumnRepository extends Repository<ColumnModel> {
  getAll() {
    return this.find();
  }

  get(id: string) {
    return this.findOne(id);
  }
}
