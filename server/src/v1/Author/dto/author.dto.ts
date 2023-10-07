import { IsArray, IsString } from 'class-validator';

class CreateAuthorDto {
  @IsString()
  email: string;

  @IsString()
  description: string;
}

export default CreateAuthorDto;
