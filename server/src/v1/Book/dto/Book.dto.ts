import { IsArray, IsNumber, IsNumberString, IsString } from 'class-validator';

class CreateBookDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumberString()
  authorId: number;
  @IsArray()
  tags: string[];
}

export default CreateBookDto;
