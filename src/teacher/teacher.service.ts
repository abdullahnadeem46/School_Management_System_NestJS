import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Class } from '../class/entities/class.entity'; // Uncommented!

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Class) // Add this!
    private classRepository: Repository<Class>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    // Check if email already exists
    const existingTeacher = await this.teacherRepository.findOne({
      where: { email: createTeacherDto.email },
    });

    if (existingTeacher) {
      throw new ConflictException('Teacher with this email already exists');
    }

    // Find the class
    const classEntity = await this.classRepository.findOne({
      where: { id: createTeacherDto.class_id },
    });

    if (!classEntity) {
      throw new NotFoundException(
        `Class with ID ${createTeacherDto.class_id} not found`,
      );
    }

    // Create teacher with class relationship
    const teacher = this.teacherRepository.create({
      name: createTeacherDto.name,
      phone: createTeacherDto.phone,
      email: createTeacherDto.email,
      classEntity: classEntity, // Add the class relation!
    });

    return await this.teacherRepository.save(teacher);
  }

  async findAll() {
    return await this.teacherRepository.find({
      relations: ['classEntity'], // This loads the class data too!
    });
  }

  async findOne(id: string) {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: ['classEntity'],
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.findOne(id);

    // Check email uniqueness if it's being updated
    if (updateTeacherDto.email && updateTeacherDto.email !== teacher.email) {
      const existingTeacher = await this.teacherRepository.findOne({
        where: { email: updateTeacherDto.email },
      });
      if (existingTeacher) {
        throw new ConflictException('Teacher with this email already exists');
      }
    }

    // If class_id is being updated, find the new class
    if (updateTeacherDto.class_id) {
      const classEntity = await this.classRepository.findOne({
        where: { id: updateTeacherDto.class_id },
      });
      if (!classEntity) {
        throw new NotFoundException(
          `Class with ID ${updateTeacherDto.class_id} not found`,
        );
      }
      teacher.classEntity = classEntity;
    }

    // Update other fields
    Object.assign(teacher, updateTeacherDto);
    return await this.teacherRepository.save(teacher);
  }

  async remove(id: string) {
    const teacher = await this.findOne(id);
    await this.teacherRepository.remove(teacher);
    return { message: 'Teacher deleted successfully' };
  }
}
