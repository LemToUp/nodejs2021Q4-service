import {EntityRepository, Repository} from 'typeorm';
import {TaskModel} from './task.model';

@EntityRepository(TaskModel)
export class TaskRepository extends Repository<TaskModel> {
  getAll() {
    return this.find();
  }

  get(id: string) {
    return this.findOne(id);
  }

  getByBoardId(boardId: string) {
    return this.findOne({ where: { boardId }});
  }
}
