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
import { GetOneParam } from '../../utils/validators/get-one-param.validator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Cattery } from './entities/cattery.entity';
import { CatteriesService } from './catteries.service';
import { CreateCatteryDto, UpdateCatteryDto } from './dto/cattery-dto';

@Controller('catteries')
export class CatteriesController {
  constructor(private catteriesService: CatteriesService) {}

  @Get()
  getAllCatteries(): Promise<Cattery[]> {
    return this.catteriesService.getAllCatteries();
  }

  @Get(':id')
  getCatteryById(@Param() { id }: GetOneParam): Promise<Cattery> {
    return this.catteriesService.getCatteryById(id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post()
  createCattery(@Body() createCatteryDto: CreateCatteryDto): Promise<Cattery> {
    return this.catteriesService.createCattery(createCatteryDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateCattery(
    @Param('id') id: string,
    @Body() updateCatteryDto: UpdateCatteryDto,
  ): Promise<Cattery> {
    return this.catteriesService.updateCattery(id, updateCatteryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCattery(@Param('id') id: string): Promise<void> {
    return this.catteriesService.deleteCattery(id);
  }
}
