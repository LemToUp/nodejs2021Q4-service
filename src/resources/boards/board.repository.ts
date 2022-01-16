import {EntityRepository, Repository} from 'typeorm';
import { BoardModel } from './board.model';

@EntityRepository(BoardModel)
export class BoardRepository extends Repository<BoardModel> {
  getAll() {
    return this.find();
  }

  get(id: string) {
    return this.findOne(id);
  }
}
