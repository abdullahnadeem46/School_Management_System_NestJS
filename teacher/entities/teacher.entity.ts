import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Class } from '../../class/entities/class.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Class, (classEntity) => classEntity.teachers, {
    // This matches!
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'class_id' })
  classEntity: Class;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;
}
