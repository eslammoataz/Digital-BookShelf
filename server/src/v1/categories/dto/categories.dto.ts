
import { IsArray, IsString } from 'class-validator';

class CreateCategoryDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
}

export default CreateCategoryDto;