import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ColumnModel} from '../column/column.model';

/**
 * @class Board model definition
 */
@Entity('boards')
export class BoardModel {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string | undefined;

  @OneToMany(() => ColumnModel, column => column.board, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate:'CASCADE'
  })
  columns: Array<ColumnModel> | undefined;

  /**
   * @description Serialize Board to the response data
   * @param board model data
   *
   * @return serialized Board
   */
  static toResponse(board: BoardModel): Partial<BoardModel> {
    const { id, title, columns } = board;

    return { id, title, columns };
  }
}
