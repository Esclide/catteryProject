import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ApplicationToCattery } from './entities/application-to-cattery.entity';
import { CatteriesService } from './catteries.service';
import { CreateApplicationToCatteryDto } from './dto/application-to-cattery-dto';
import { applicationStatus } from './lib/applicationStatus.enum';

@Injectable()
export class ApplicationsService {
  private notFoundError = 'Application not found';
  private notActiveError = 'Application is not active';
  private applicationAlreadyExistsError =
    'Active application to this cattery already exists';
  private alreadyInCatteryError = 'User already in this cattery';

  constructor(
    @InjectRepository(ApplicationToCattery)
    private readonly applicationRepository: Repository<ApplicationToCattery>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly catteriesService: CatteriesService,
  ) {}

  async getApplication(
    catteryId: string,
    applicationId: string,
  ): Promise<ApplicationToCattery> {
    const application = await this.applicationRepository.findOne(
      applicationId,
      { relations: ['cattery', 'user'] },
    );
    const cattery = await this.catteriesService.getCatteryById(catteryId);
    if (application && application.cattery.id === cattery.id) {
      return application;
    }
    throw new HttpException(this.notFoundError, HttpStatus.NOT_FOUND);
  }

  async getAllUserApplications(
    userId: string,
  ): Promise<ApplicationToCattery[]> {
    const user = await this.usersService.getUserById(userId);
    return await this.applicationRepository.find({
      where: { user: user },
      relations: ['cattery'],
    });
  }

  async getActiveCatteryApplications(
    catteryId: string,
  ): Promise<ApplicationToCattery[]> {
    const cattery = await this.catteriesService.getCatteryById(catteryId);
    const applications = await this.applicationRepository.find({
      where: { cattery: cattery },
      relations: ['user'],
    });

    return applications
      .map((application) => {
        if (application.status === 'in progress') return application;
      })
      .filter(function (application) {
        return application !== undefined;
      });
  }

  async sendApplicationToCattery(
    userId,
    catteryId: string,
    createApplicationToCatteryDto: CreateApplicationToCatteryDto,
  ) {
    if (await this.getActiveUserApplicationToCattery(userId, catteryId)) {
      throw new HttpException(
        this.applicationAlreadyExistsError,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (await this.catteriesService.ifUserInCattery(catteryId, userId)) {
      throw new HttpException(
        this.alreadyInCatteryError,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newApplication = await this.applicationRepository.create(
      createApplicationToCatteryDto,
    );
    newApplication.user = await this.usersService.getUserById(userId);
    newApplication.cattery = await this.catteriesService.getCatteryById(
      catteryId,
    );
    await this.applicationRepository.save(newApplication);
    return newApplication;
  }

  async getActiveUserApplicationToCattery(
    userId: string,
    catteryId: string,
  ): Promise<ApplicationToCattery> {
    const user = await this.usersService.getUserById(userId);
    const cattery = await this.catteriesService.getCatteryById(catteryId);
    let foundApplication: ApplicationToCattery = undefined;

    const applications = await this.applicationRepository.find({
      where: { user: user, cattery: cattery },
    });

    if (applications) {
      applications.forEach((application) => {
        if (application.status === applicationStatus['in progress'])
          foundApplication = application;
      });
    }
    return foundApplication;
  }

  async approveApplication(catteryId: string, appId: string) {
    const application = await this.getApplication(catteryId, appId);
    if (application.status !== applicationStatus['in progress']) {
      throw new HttpException(this.notActiveError, HttpStatus.BAD_REQUEST);
    }
    application.status = applicationStatus.approved;
    application.changeDate = new Date();

    await this.applicationRepository.save(application);
    await this.catteriesService.addUserToCattery(
      catteryId,
      application.user.id,
    );
    return application;
  }

  async rejectApplication(catteryId: string, appId: string) {
    const application = await this.getApplication(catteryId, appId);
    if (application.status !== applicationStatus['in progress']) {
      throw new HttpException(this.notActiveError, HttpStatus.BAD_REQUEST);
    }
    application.status = applicationStatus.rejected;
    application.changeDate = new Date();

    await this.applicationRepository.save(application);
    return application;
  }
}
