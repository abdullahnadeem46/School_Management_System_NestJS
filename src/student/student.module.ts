import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';
import { Class } from '../class/entities/class.entity';
import { Book } from '../book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Class, Book])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [TypeOrmModule],
})
export class StudentModule {}
