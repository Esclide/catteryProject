import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBreedDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdateBreedDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;
}
