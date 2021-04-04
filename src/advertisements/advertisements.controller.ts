import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { GetOneParam } from '../../utils/validators/get-one-param.validator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Advertisement } from './entities/advertisement.entity';
import {
  CreateAdvertisementDto,
  UpdateAdvertisementDto,
} from './dto/advertisement-dto';
import { CreateAdvertisementAttachmentDto } from './dto/advertisement-attachment-dto';
import { AdvertisementAttachments } from './entities/advertisement-attachments.entity';

@Controller('adverts')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @Get()
  getAllAdvertisements(): Promise<Advertisement[]> {
    return this.advertisementsService.getAllAdvertisements();
  }

  @Get(':id')
  getAdvertisementById(@Param() { id }: GetOneParam): Promise<Advertisement> {
    return this.advertisementsService.getAdvertisementById(id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post()
  createAdvertisement(
    @Body() createAdvertisementDto: CreateAdvertisementDto,
  ): Promise<Advertisement> {
    createAdvertisementDto.level = 'general';
    return this.advertisementsService.createAdvertisement(
      createAdvertisementDto,
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateAdvertisement(
    @Param('id') id: string,
    @Body() updateAdvertisementDto: UpdateAdvertisementDto,
  ): Promise<Advertisement> {
    return this.advertisementsService.updateAdvertisement(
      id,
      updateAdvertisementDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteAdvertisement(@Param('id') id: string): Promise<void> {
    return this.advertisementsService.deleteAdvertisement(id);
  }

  @Get(':id/attach')
  getAdvertisementAttachments(
    @Param() { id }: GetOneParam,
  ): Promise<AdvertisementAttachments[]> {
    return this.advertisementsService.getAdvertisementAttachments(id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post(':id/attach')
  addAttachments(
    @Param() { id }: GetOneParam,
    @Body()
    createAdvertisementAttachmentDtoArray: CreateAdvertisementAttachmentDto[],
  ): Promise<AdvertisementAttachments[]> {
    return this.advertisementsService.addAttachments(
      id,
      createAdvertisementAttachmentDtoArray,
    );
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete(':advertsId/attach/:attachId')
  deleteAttachment(
    @Param('advertsId') advertsId: string,
    @Param('attachId') attachId: string,
  ): Promise<void> {
    return this.advertisementsService.deleteAttachment(advertsId, attachId);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Put(':advertsId/attach/:attachId/main')
  setMainPhoto(
    @Param('advertsId') advertsId: string,
    @Param('attachId') attachId: string,
  ): Promise<void> {
    return this.advertisementsService.setMainPhoto(advertsId, attachId);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get(':advertsId/attach/main')
  getMainPhoto(
    @Param('advertsId') advertsId: string,
  ): Promise<AdvertisementAttachments> {
    return this.advertisementsService.getAdvertisementMainPhoto(advertsId);
  }
}
