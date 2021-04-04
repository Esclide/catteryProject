import {
  Controller,
  forwardRef,
  Get,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CatteriesService } from '../catteries/catteries.service';
import { ApplicationsService } from '../catteries/applications.service';
import { ApplicationToCattery } from '../catteries/entities/application-to-cattery.entity';
import { User } from './entities/user.entity';
import { Cattery } from '../catteries/entities/cattery.entity';

@Controller('profile')
export class ProfileController {
  constructor(
    private usersService: UsersService,
    @Inject(forwardRef(() => CatteriesService))
    private readonly catteriesService: CatteriesService,
    @Inject(forwardRef(() => ApplicationsService))
    private readonly applicationsService: ApplicationsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getProfile(@Req() request): Promise<User> {
    return this.usersService.getUserById(request.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('catteries')
  getAllCatteries(@Req() request): Promise<Cattery[]> {
    return this.catteriesService.getAllUserCatteries(request.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('catteries/applications')
  getAllApplicationsToCatteries(@Req() request): Promise<ApplicationToCattery[]> {
    return this.applicationsService.getAllUserApplications(request.user.userId);
  }
}
