import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty({ message: 'Class name is required' })
  @MaxLength(50, { message: 'Class name cannot exceed 50 characters' })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'Description cannot exceed 200 characters' })
  description?: string;
}
