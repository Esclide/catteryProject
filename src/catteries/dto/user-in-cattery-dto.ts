import {
  IsBoolean,
  IsEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserInCatteryDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsNumberString()
  @IsOptional()
  catteryId?: string;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;

  @IsBoolean()
  @IsOptional()
  isFeePaid?: boolean;

  @IsEmpty()
  isDeleted?: boolean;

  @IsEmpty()
  deletionDate?: string;
}
