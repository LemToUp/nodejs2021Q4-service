import {EntityRepository, Repository} from 'typeorm';
import { UserModel } from './user.model';

@EntityRepository(UserModel)
export class UserRepository extends Repository<UserModel> {
  getAll() {
    return this.find();
  }

  get(id: string) {
    return this.findOne(id);
  }
}
