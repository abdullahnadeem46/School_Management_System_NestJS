import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const newClass = this.classRepository.create(createClassDto);
    return await this.classRepository.save(newClass);
  }

  async findAll() {
    return await this.classRepository.find();
  }

  async findOne(id: number) {
    const classEntity = await this.classRepository.findOne({ where: { id } });
    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return classEntity;
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    const classEntity = await this.findOne(id);
    Object.assign(classEntity, updateClassDto);
    return await this.classRepository.save(classEntity);
  }

  async remove(id: number) {
    const classEntity = await this.findOne(id);
    await this.classRepository.remove(classEntity);
    return { message: 'Class deleted successfully' };
  }
}
