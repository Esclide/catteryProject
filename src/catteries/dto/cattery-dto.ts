import {
  IsArray,
  IsEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCatteryDto {
  @IsString()
  name: string;

  @IsArray()
  breedNames: string[];

  @IsEmpty()
  registrationDate?: string;

  @IsNumber()
  membershipFee: number;

  @IsString()
  leaderUsername: string;

  @IsString()
  country?: string;

  @IsString()
  city?: string;

  @IsString()
  @IsOptional()
  site?: string;
}

export class UpdateCatteryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsOptional()
  breedNames?: string[];

  @IsNumber()
  @IsOptional()
  membershipFee?: number;

  @IsString()
  @IsOptional()
  leaderUsername?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  site?: string;

  @IsEmpty()
  isDeleted?: boolean;

  @IsEmpty()
  deletionDate?: string;
}

export const catteryFieldsForUpdate = [
  'name',
  'membershipFee',
  'country',
  'city',
  'site',
  'isDeleted',
  'deletionDate',
];