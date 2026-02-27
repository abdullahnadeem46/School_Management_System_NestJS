import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty({ message: 'School name is required' })
  @MaxLength(50, { message: 'School name cannot exceed 50 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  @MaxLength(50, { message: 'Phone cannot exceed 50 characters' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Website is required' })
  @MaxLength(255, { message: 'Website cannot exceed 255 characters' })
  website: string;
}
