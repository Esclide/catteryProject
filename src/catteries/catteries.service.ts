import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cattery } from './entities/cattery.entity';
import { BreedsService } from '../cats/cats.service';
import {
  catteryFieldsForUpdate,
  CreateCatteryDto,
  UpdateCatteryDto,
} from './dto/cattery-dto';
import { UsersService } from '../users/users.service';
import { Breed } from '../cats/entities/breed.entity';
import pick from 'lodash/pick';
import { UserInCattery } from './entities/user-in-cattery.entity';
import { Cat } from '../cats/entities/cat.entity';

@Injectable()
export class CatteriesService {
  private notFoundCatteryError = 'Cattery not found';
  private notFoundUserInCatteryError = 'User in cattery not found';
  private leaderDeletionError = 'Cannot delete leader of cattery';

  constructor(
    @InjectRepository(Cattery)
    private readonly catteriesRepository: Repository<Cattery>,
    @InjectRepository(UserInCattery)
    private readonly usersInCatteriesRepository: Repository<UserInCattery>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly breedsService: BreedsService,
  ) {}

  async getAllCatteries(): Promise<Cattery[]> {
    const catteries = await this.catteriesRepository.find();
    return catteries
      .map((cattery) => {
        if (!cattery.isDeleted) return cattery;
      })
      .filter(function (cattery) {
        return cattery !== undefined;
      });
  }

  async getAllUserCatteries(userId: string): Promise<Cattery[]> {
    const user = await this.usersService.getUserById(userId);
    const userInCatteries = await this.usersInCatteriesRepository.find({
      where: { user: user },
      relations: ['cattery'],
    });
    const catteries: Cattery[] = userInCatteries.map(
      (userInCattery) => userInCattery.cattery,
    );
    const leadCatteries: Cattery[] = await this.usersService.getUserLeadCatteries(
      userId,
    );
    if (leadCatteries) catteries.push(...leadCatteries);
    return catteries;
  }

  async getCatteryById(id: string): Promise<Cattery> {
    const cattery = await this.catteriesRepository.findOne(id, {
      relations: ['leader'],
    });
    if (cattery && !cattery.isDeleted) {
      return cattery;
    }
    throw new HttpException(this.notFoundCatteryError, HttpStatus.NOT_FOUND);
  }

  async createCattery(createCatteryDto: CreateCatteryDto) {
    const newCattery = this.catteriesRepository.create(createCatteryDto);
    newCattery.leader = await this.usersService.getUserByUsername(
      createCatteryDto.leaderUsername,
    );
    const breeds: Breed[] = [];
    for (const breedName of createCatteryDto.breedNames) {
      breeds.push(await this.breedsService.getBreedByName(breedName));
    }
    newCattery.breeds = breeds;
    await this.catteriesRepository.save(newCattery);
    await this.addUserToCattery(newCattery.id, newCattery.leader.id);
    await this.setUserAdmin(newCattery.id, newCattery.leader.id);
    return newCattery;
  }

  async updateCattery(id: string, updateCatteryDto: UpdateCatteryDto) {
    const updatedCattery = await this.catteriesRepository.findOne(id);
    if (!updatedCattery) {
      throw new HttpException(this.notFoundCatteryError, HttpStatus.NOT_FOUND);
    }

    const updatedFields = Object.keys(
      pick(updateCatteryDto, catteryFieldsForUpdate),
    );
    for (const field of updatedFields) {
      updatedCattery[field] = updateCatteryDto[field];
    }

    if (updateCatteryDto.leaderUsername)
      updatedCattery.leader = await this.usersService.getUserByUsername(
        updateCatteryDto.leaderUsername,
      );
    if (updateCatteryDto.breedNames) {
      const breeds: Breed[] = [];
      for (const breedName of updateCatteryDto.breedNames) {
        breeds.push(await this.breedsService.getBreedByName(breedName));
      }
      updatedCattery.breeds = breeds;
    }
    await this.catteriesRepository.save(updatedCattery);
    return updatedCattery;
  }

  async deleteCattery(id: string) {
    await this.updateCattery(id, {
      isDeleted: true,
      deletionDate: new Date().toISOString(),
    });
  }

  async getCatteryUsers(catteryId: string): Promise<UserInCattery[]> {
    const cattery = await this.getCatteryById(catteryId);
    return await this.usersInCatteriesRepository.find({
      where: { cattery: cattery },
      relations: ['user'],
    });
  }

  async getCatteryUserById(
    catteryId: string,
    userId: string,
  ): Promise<UserInCattery> {
    const cattery = await this.getCatteryById(catteryId);
    const user = await this.usersService.getUserById(userId);
    const member = await this.usersInCatteriesRepository.findOne({
      where: { cattery: cattery, user: user },
      relations: ['user'],
    });
    if (member) return member;
    throw new HttpException(
      this.notFoundUserInCatteryError,
      HttpStatus.NOT_FOUND,
    );
  }

  async ifUserInCattery(catteryId: string, userId: string): Promise<boolean> {
    const cattery = await this.getCatteryById(catteryId);
    const user = await this.usersService.getUserById(userId);
    const member = await this.usersInCatteriesRepository.findOne({
      where: { cattery: cattery, user: user },
      relations: ['user'],
    });
    return !!member;
  }

  async addUserToCattery(
    catteryId: string,
    userId: string,
  ): Promise<UserInCattery> {
    const cattery = await this.getCatteryById(catteryId);
    const user = await this.usersService.getUserById(userId);

    const newUserInCattery = this.usersInCatteriesRepository.create();
    newUserInCattery.cattery = cattery;
    newUserInCattery.user = user;

    await this.usersInCatteriesRepository.save(newUserInCattery);
    return newUserInCattery;
  }

  async deleteUserFromCattery(
    catteryId: string,
    userId: string,
  ): Promise<void> {
    const userInCattery = await this.getCatteryUserById(catteryId, userId);
    const catteryLeader = (await this.getCatteryById(catteryId)).leader;
    if (userInCattery.user == catteryLeader) {
      throw new HttpException(
        this.leaderDeletionError,
        HttpStatus.BAD_REQUEST,
      );
    }

    const deleteResponse = await this.usersInCatteriesRepository.delete(
      userInCattery.id,
    );
    if (!deleteResponse.affected) {
      throw new HttpException(
        this.notFoundUserInCatteryError,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async setFeePaid(catteryId: string, userId: string): Promise<void> {
    const userInCattery = await this.getCatteryUserById(catteryId, userId);
    userInCattery.isFeePaid = true;
    await this.usersInCatteriesRepository.save(userInCattery);
  }

  async setFeeUnpaid(catteryId: string, userId: string): Promise<void> {
    const userInCattery = await this.getCatteryUserById(catteryId, userId);
    userInCattery.isFeePaid = false;
    await this.usersInCatteriesRepository.save(userInCattery);
  }

  async setUserAdmin(catteryId: string, userId: string): Promise<void> {
    const userInCattery = await this.getCatteryUserById(catteryId, userId);
    userInCattery.isAdmin = true;
    await this.usersInCatteriesRepository.save(userInCattery);
  }

  async unsetUserAdmin(catteryId: string, userId: string): Promise<void> {
    const userInCattery = await this.getCatteryUserById(catteryId, userId);
    userInCattery.isAdmin = false;
    await this.usersInCatteriesRepository.save(userInCattery);
  }

  async getAllCatteryCats(catteryId: string): Promise<Cat[]> {
    const cats: Cat[] = [];
    const usersInCattery = await this.getCatteryUsers(catteryId);
    if (usersInCattery) {
      for (const userInCattery of usersInCattery) {
        const ownedCats = await this.usersService.getOwnedCatsByUserId(
          userInCattery.user.id,
        );
        if (ownedCats) {
          cats.push(...ownedCats);
        }
      }
    }
    return cats;
  }
}
