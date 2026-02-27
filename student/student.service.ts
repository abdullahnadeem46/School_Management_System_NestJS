import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Class } from '../class/entities/class.entity';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    // Find the class
    const classEntity = await this.classRepository.findOne({
      where: { id: createStudentDto.class_id },
    });

    if (!classEntity) {
      throw new NotFoundException(
        `Class with ID ${createStudentDto.class_id} not found`,
      );
    }

    // Find the book
    const bookEntity = await this.bookRepository.findOne({
      where: { id: createStudentDto.book_id },
    });

    if (!bookEntity) {
      throw new NotFoundException(
        `Book with ID ${createStudentDto.book_id} not found`,
      );
    }

    // Create student with relations
    const student = this.studentRepository.create({
      name: createStudentDto.name,
      roll: createStudentDto.roll,
      registration: createStudentDto.registration,
      classEntity: classEntity,
      bookEntity: bookEntity,
    });

    return await this.studentRepository.save(student);
  }

  async findAll() {
    return await this.studentRepository.find({
      relations: ['classEntity', 'bookEntity'],
    });
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['classEntity', 'bookEntity'],
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);

    // Update class if provided
    if (updateStudentDto.class_id) {
      const classEntity = await this.classRepository.findOne({
        where: { id: updateStudentDto.class_id },
      });
      if (!classEntity) {
        throw new NotFoundException(
          `Class with ID ${updateStudentDto.class_id} not found`,
        );
      }
      student.classEntity = classEntity;
    }

    // Update book if provided
    if (updateStudentDto.book_id) {
      const bookEntity = await this.bookRepository.findOne({
        where: { id: updateStudentDto.book_id },
      });
      if (!bookEntity) {
        throw new NotFoundException(
          `Book with ID ${updateStudentDto.book_id} not found`,
        );
      }
      student.bookEntity = bookEntity;
    }

    // Update other fields
    Object.assign(student, updateStudentDto);
    return await this.studentRepository.save(student);
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    await this.studentRepository.remove(student);
    return { message: 'Student deleted successfully' };
  }

  // Special method: Get students by class
  async getStudentsByClass(classId: number) {
    return await this.studentRepository.find({
      where: { classEntity: { id: classId } },
      relations: ['classEntity', 'bookEntity'],
    });
  }

  // Special method: Get students by teacher (coming soon!)
  async getStudentsByTeacher(teacherId: string) {
    // We'll implement this after Teacher-Student relationship is set up
    return await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.classEntity', 'class')
      .leftJoinAndSelect('student.bookEntity', 'book')
      .leftJoin('class.teachers', 'teacher')
      .where('teacher.id = :teacherId', { teacherId })
      .getMany();
  }
}
