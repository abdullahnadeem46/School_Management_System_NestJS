import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto) {
    const school = this.schoolRepository.create(createSchoolDto);
    return await this.schoolRepository.save(school);
  }

  async findAll() {
    return await this.schoolRepository.find();
  }

  async findOne(id: string) {
    const school = await this.schoolRepository.findOne({ where: { id } });
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }
    return school;
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto) {
    const school = await this.findOne(id);
    Object.assign(school, updateSchoolDto);
    return await this.schoolRepository.save(school);
  }

  async remove(id: string) {
    const school = await this.findOne(id);
    await this.schoolRepository.remove(school);
    return { message: 'School deleted successfully' };
  }
}
