import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class ToDoListEntity {
  @PrimaryGeneratedColumn('uuid')
  todoUid: string = uuidv4();

  @Column()
  userUid: string;

  @Column()
  whatToDo: string;

  @Column()
  whenDate: string;

  @Column({ default: false })
  isDelete: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;
}
