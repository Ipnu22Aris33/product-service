import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategortRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
