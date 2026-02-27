import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { BookModule } from './book/book.module';
import { ClassModule } from './class/class.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SchoolModule } from './school/school.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BookModule,
    ClassModule,
    TeacherModule,
    StudentModule,
    UserModule,
    AuthModule,
    SchoolModule,
  ],
})
export class AppModule {}
