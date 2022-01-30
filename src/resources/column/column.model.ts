import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BoardModel} from '../boards/board.model';

/**
 * @class Column model definition
 */
@Entity('columns')
export class ColumnModel {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string | undefined;

  @Column({ type: 'integer', nullable: true })
  order: number | undefined;

  @ManyToOne(() => BoardModel, board => board.columns)
  board: BoardModel | undefined;
}
