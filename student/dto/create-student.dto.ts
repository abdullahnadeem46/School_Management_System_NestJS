import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty({ message: 'Student name is required' })
  @MaxLength(50, { message: 'Name cannot exceed 50 characters' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Class ID is required' })
  class_id: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Book ID is required' })
  book_id: number;

  @IsString()
  @IsNotEmpty({ message: 'Roll number is required' })
  @MaxLength(50, { message: 'Roll number cannot exceed 50 characters' })
  roll: string;

  @IsString()
  @IsNotEmpty({ message: 'Registration number is required' })
  @MaxLength(50, { message: 'Registration cannot exceed 50 characters' })
  registration: string;
}
