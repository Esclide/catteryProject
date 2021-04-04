import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetOneParam } from '../../utils/validators/get-one-param.validator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Cattery } from './entities/cattery.entity';
import { CatteriesService } from './catteries.service';
import { CreateCatteryDto, UpdateCatteryDto } from './dto/cattery-dto';
import { UserInCattery } from './entities/user-in-cattery.entity';
import { Cat } from '../cats/entities/cat.entity';
import { CreateAdvertisementDto } from '../advertisements/dto/advertisement-dto';
import { Advertisement } from '../advertisements/entities/advertisement.entity';
import { AdvertisementsService } from '../advertisements/advertisements.service';

@Controller('catteries')
export class CatteriesController {
  constructor(
    private catteriesService: CatteriesService,
    @Inject(forwardRef(() => AdvertisementsService))
    private advertisementsService: AdvertisementsService,
  ) {}

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
  async deleteCattery(@Param() { id }: GetOneParam): Promise<void> {
    return this.catteriesService.deleteCattery(id);
  }

  @Get(':id/members')
  getAllUsers(@Param() { id }: GetOneParam): Promise<UserInCattery[]> {
    return this.catteriesService.getCatteryUsers(id);
  }

  @Get(':catteryId/members/:userId')
  getUser(
    @Param('catteryId') catteryId: string,
    @Param('userId') userId: string,
  ): Promise<UserInCattery> {
    return this.catteriesService.getCatteryUserById(catteryId, userId);
  }

  @Delete(':catteryId/members/:userId')
  @UseGuards(JwtAuthGuard)
  async deleteUserFromCattery(
    @Param('catteryId') catteryId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.catteriesService.deleteUserFromCattery(catteryId, userId);
  }

  @Delete(':id/leave')
  @UseGuards(JwtAuthGuard)
  leaveCattery(@Req() request, @Param() { id }: GetOneParam): Promise<void> {
    return this.catteriesService.deleteUserFromCattery(id, request.user.userId);
  }

  @Put(':catteryId/members/:userId/feePaid')
  @UseGuards(JwtAuthGuard)
  setFeePaid(
    @Param('catteryId') catteryId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.catteriesService.setFeePaid(catteryId, userId);
  }

  @Put(':catteryId/members/:userId/feeUnpaid')
  @UseGuards(JwtAuthGuard)
  setFeeUnpaid(
    @Param('catteryId') catteryId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.catteriesService.setFeeUnpaid(catteryId, userId);
  }

  @Put(':catteryId/members/:userId/setAdmin')
  @UseGuards(JwtAuthGuard)
  setUserAdmin(
    @Param('catteryId') catteryId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.catteriesService.setUserAdmin(catteryId, userId);
  }

  @Put(':catteryId/members/:userId/unsetAdmin')
  @UseGuards(JwtAuthGuard)
  unsetUserAdmin(
    @Param('catteryId') catteryId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.catteriesService.unsetUserAdmin(catteryId, userId);
  }

  @Get(':id/cats')
  @UseGuards(JwtAuthGuard)
  getAllCatteryCats(@Param() { id }: GetOneParam): Promise<Cat[]> {
    return this.catteriesService.getAllCatteryCats(id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post(':id/advertisement')
  createAdvertisement(
    @Body() createAdvertisementDto: CreateAdvertisementDto,
    @Param() { id }: GetOneParam,
  ): Promise<Advertisement> {
    createAdvertisementDto.level = 'general';
    createAdvertisementDto.catteryId = id;
    return this.advertisementsService.createAdvertisement(
      createAdvertisementDto,
    );
  }
}
