import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher } from './entities/teacher.entity';
import { Class } from '../class/entities/class.entity'; // Add this!

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Class])], // Add Class here!
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TypeOrmModule],
})
export class TeacherModule {}
