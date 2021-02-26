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
}
