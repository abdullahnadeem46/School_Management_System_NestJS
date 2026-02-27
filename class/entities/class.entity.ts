import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
 import { Teacher } from '../../teacher/entities/teacher.entity'; // Will uncomment when ready
 import { Student } from '../../student/entities/student.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

   @OneToMany(() => Teacher, (teacher) => teacher.classEntity)
  teachers: Teacher[];

   @OneToMany(() => Student, (student) => student.classEntity)
   students: Student[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
