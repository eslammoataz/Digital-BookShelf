
import { IsArray, IsString } from 'class-validator';

class CreateBookDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  author: string;
}

export default CreateBookDto;