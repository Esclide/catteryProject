import { IsBoolean, IsNumberString, IsString } from 'class-validator';

export class CreateCatDto {
  @IsNumberString()
  catId: string;

  @IsString()
  path: boolean;

  @IsBoolean()
  isMainPhoto: boolean;
}
