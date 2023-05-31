
import { IsArray, IsString, } from 'class-validator';

class CreateBookDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  author: string;
  @IsArray()
  tags: string[];
}

export default CreateBookDto;