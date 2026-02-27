import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

type SafeUser = Omit<User, 'password'>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  private removePassword(user: User): SafeUser {
    const { password, ...rest } = user;
    return rest;
  }

  async create(createUserDto: CreateUserDto): Promise<SafeUser> {
    const existing = await this.userRepo.findOne({
      where: { username: createUserDto.username },
    });

    if (existing) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepo.save(user);
    return this.removePassword(savedUser);
  }

  async findAll(): Promise<SafeUser[]> {
    const users = await this.userRepo.find();
    return users.map((user) => this.removePassword(user));
  }

  async findOne(id: string): Promise<SafeUser> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.removePassword(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<SafeUser> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    const savedUser = await this.userRepo.save(user);
    return this.removePassword(savedUser);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return { deleted: true };
  }
}
