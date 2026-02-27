import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
