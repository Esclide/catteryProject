import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetOneParam } from '../../utils/validators/get-one-param.validator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApplicationToCattery } from './entities/application-to-cattery.entity';
import { ApplicationsService } from './applications.service';
import { CreateApplicationToCatteryDto } from './dto/application-to-cattery-dto';

@Controller('')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('catteries/:catteryId/applications/:appId')
  getApplication(
    @Param('catteryId') catteryId: string,
    @Param('appId') appId: string,
  ): Promise<ApplicationToCattery> {
    return this.applicationsService.getApplication(catteryId, appId);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('catteries/:id/request')
  sendApplicationToCattery(
    @Req() request,
    @Param() { id }: GetOneParam,
    @Body() createApplicationToCatteryDto: CreateApplicationToCatteryDto,
  ): Promise<ApplicationToCattery> {
    return this.applicationsService.sendApplicationToCattery(
      request.user.userId,
      id,
      createApplicationToCatteryDto,
    );
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('catteries/:id/applications')
  getActiveCatteryApplications(
    @Param() { id }: GetOneParam,
  ): Promise<ApplicationToCattery[]> {
    return this.applicationsService.getActiveCatteryApplications(id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('catteries/:catteryId/applications/:appId/approve')
  approveApplication(
    @Param('catteryId') catteryId: string,
    @Param('appId') appId: string,
  ): Promise<ApplicationToCattery> {
    return this.applicationsService.approveApplication(catteryId, appId);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('catteries/:catteryId/applications/:appId/reject')
  rejectApplication(
    @Param('catteryId') catteryId: string,
    @Param('appId') appId: string,
  ): Promise<ApplicationToCattery> {
    return this.applicationsService.rejectApplication(catteryId, appId);
  }
}
