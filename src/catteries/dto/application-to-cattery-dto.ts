import { IsOptional, IsString } from 'class-validator';

export class CreateApplicationToCatteryDto {
  @IsString()
  @IsOptional()
  message?: string;
}
