import { IsBoolean, IsNumberString, IsString } from 'class-validator';

export class CreateCatAttachmentDto {
  @IsNumberString()
  catId: string;

  @IsString()
  path: boolean;

  @IsBoolean()
  isMainPhoto: boolean;
}
