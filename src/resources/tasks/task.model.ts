import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserModel } from '../users/user.model';
import { BoardModel } from '../boards/board.model';
import { ColumnModel } from '../column/column.model';

/**
 * @class Task model definition
 */
@Entity('tasks')
export class TaskModel {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string | undefined;

  @Column({ type: 'integer', nullable: true })
  order: number | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string | undefined;

  @ManyToOne(() => UserModel)
  user: UserModel |  undefined;

  @ManyToOne(() => BoardModel)
  board: BoardModel | undefined;

  @ManyToOne(() => ColumnModel)
  column: ColumnModel | undefined;

  /**
   * @description Serialize Task to the response data
   * @param task model data
   *
   * @return serialized Task
   */
  static toResponse(task: TaskModel) {
    const {
      id = undefined,
      title = undefined,
      order = undefined,
      description = undefined,
      user = null,
      board = null,
      column = null
    } = task;

    return {
      id,
      title,
      order,
      description,
      userId: user?.id || null,
      boardId: board?.id || null,
      columnId: column?.id || null
    };
  }
}
