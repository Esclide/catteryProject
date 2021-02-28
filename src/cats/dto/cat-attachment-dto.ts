import { IsBoolean, IsNumberString, IsString } from 'class-validator';

export class CreateCatAttachmentDto {
  @IsNumberString()
  catId: string;

  @IsString()
  path: string;

  @IsBoolean()
  isMainPhoto: boolean;
}
