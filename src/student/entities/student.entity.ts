import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Class } from '../../class/entities/class.entity';
import { Book } from '../../book/entities/book.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => Class, (classEntity) => classEntity.students, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'class_id' })
  classEntity: Class;

  @ManyToOne(() => Book, (bookEntity) => bookEntity.students, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'book_id' })
  bookEntity: Book;

  @Column({ type: 'varchar', length: 50 })
  roll: string;

  @Column({ type: 'varchar', length: 50 })
  registration: string;
}
