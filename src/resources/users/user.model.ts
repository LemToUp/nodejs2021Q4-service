import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {TaskModel} from '../tasks/task.model';

/**
 * @class UserModel model definition
 */
@Entity('users')
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
  login: string | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string | undefined;

  @OneToMany(() => TaskModel, task => task.user, {
    onDelete: 'SET NULL',
    cascade: true
  })
  tasks: Array<TaskModel> | undefined;

  /**
   * @description Serialize User to the response data
   * @param user model data
   *
   * @return serialized User
   */
  static toResponse(user: UserModel): Partial<UserModel> {
    const { id, name, login } = user;

    return { id, name, login };
  }
}
