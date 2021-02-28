import { IsBoolean, IsNumberString, IsString } from 'class-validator';

export class CreateAdvertisementAttachmentDto {
  @IsNumberString()
  catId: string;

  @IsString()
  path: boolean;

  @IsBoolean()
  isMainPhoto: boolean;
}
