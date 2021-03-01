import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

@Injectable()
export class CatteriesService {
  private notFoundError = 'Cattery not found';

  constructor(
    @InjectRepository(Cattery)
    private readonly catteriesRepository: Repository<Cattery>,
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

  async getCatteryById(id: string): Promise<Cattery> {
    const cattery = await this.catteriesRepository.findOne(id, {
      relations: ['leader'],
    });
    if (cattery && !cattery.isDeleted) {
      return cattery;
    }
    throw new HttpException(this.notFoundError, HttpStatus.NOT_FOUND);
  }

  async createCattery(createCatteryDto: CreateCatteryDto) {
    const newCattery = await this.catteriesRepository.create(createCatteryDto);
    newCattery.leader = await this.usersService.getUserByUsername(
      createCatteryDto.leaderUsername,
    );
    const breeds: Breed[] = [];
    for (const breedName of createCatteryDto.breedNames) {
      breeds.push(await this.breedsService.getBreedByName(breedName));
    }
    newCattery.breeds = breeds;
    await this.catteriesRepository.save(newCattery);
    return newCattery;
  }

  async updateCattery(id: string, updateCatteryDto: UpdateCatteryDto) {
    const updatedCattery = await this.catteriesRepository.findOne(id);
    if (!updatedCattery) {
      throw new HttpException(this.notFoundError, HttpStatus.NOT_FOUND);
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
}
