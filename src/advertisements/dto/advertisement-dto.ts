import {
  IsArray,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAdvertisementDto {
  @IsEnum(['sale', 'knitting'])
  type: string;

  @IsEnum(['general', 'cattery'])
  level: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  creatorUsername: string;

  @IsNumber()
  price: number;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsArray()
  catIDs: string[];
}

export class UpdateAdvertisementDto {
  @IsEnum(['sale', 'knitting'])
  @IsOptional()
  type?: string;

  @IsEnum(['general', 'cattery'])
  @IsOptional()
  level?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsEmpty()
  @IsOptional()
  isDeleted?: boolean;

  @IsEmpty()
  @IsOptional()
  deletionDate?: string;

  @IsArray()
  @IsOptional()
  catIDs?: string[];
}

export const advertisementFieldsForUpdate = [
  'type',
  'level',
  'title',
  'description',
  'price',
  'country',
  'city',
  'isDeleted',
  'deletionDate',
];
