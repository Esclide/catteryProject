import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateApplicationToCatteryDto {
  @IsEnum(['approved', 'in progress', 'rejected'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  message?: string;
}

export class UpdateApplicationToCatteryDto {
  @IsString()
  username: string;

  @IsNumberString()
  catteryId?: string;

  @IsEnum(['approved', 'in progress', 'rejected'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  message?: string;
}
