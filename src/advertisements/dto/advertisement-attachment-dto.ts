import { IsBoolean, IsNumberString, IsString } from 'class-validator';

export class CreateAdvertisementAttachmentDto {
  @IsNumberString()
  advertisementId: string;

  @IsString()
  path: string;

  @IsBoolean()
  isMainPhoto: boolean;
}
