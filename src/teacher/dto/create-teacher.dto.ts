import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreateTeacherDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Class ID is required' })
  class_id: number;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(50, { message: 'Name cannot exceed 50 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  @MaxLength(50, { message: 'Phone cannot exceed 50 characters' })
  phone: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(50, { message: 'Email cannot exceed 50 characters' })
  email: string;
}
