import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertisement } from './entities/advertisement.entity';
import {
  advertisementFieldsForUpdate,
  CreateAdvertisementDto,
  UpdateAdvertisementDto,
} from './dto/advertisement-dto';
import pick from 'lodash/pick';
import { CatsService } from '../cats/cats.service';
import { UsersService } from '../users/users.service';
import { Cat } from '../cats/entities/cat.entity';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private advertisementsRepository: Repository<Advertisement>,
    private readonly usersService: UsersService,
    private readonly catsService: CatsService,
  ) {}

  async getAllAdvertisements() {
    const advertisements = await this.advertisementsRepository.find();
    return advertisements
      .map((advertisements) => {
        if (!advertisements.isDeleted && advertisements.level === 'general')
          return advertisements;
      })
      .filter(function (advertisement) {
        return advertisement !== undefined;
      });
  }

  async getAdvertisementById(id: string) {
    const advertisements = await this.advertisementsRepository.findOne(id);
    if (advertisements && !advertisements.isDeleted) {
      return advertisements;
    }
    throw new HttpException('Advertisements not found', HttpStatus.NOT_FOUND);
  }

  async createAdvertisement(createAdvertisementDto: CreateAdvertisementDto) {
    const newAdvertisement = await this.advertisementsRepository.create(
      createAdvertisementDto,
    );
    newAdvertisement.creator = await this.usersService.getUserByUsername(
      createAdvertisementDto.creatorUsername,
    );
    if (createAdvertisementDto.catIDs) {
      const cats: Cat[] = [];
      for (const catId of createAdvertisementDto.catIDs) {
        cats.push(await this.catsService.getCatById(catId));
      }
      newAdvertisement.cats = cats;
    }

    await this.advertisementsRepository.save(newAdvertisement);
    return newAdvertisement;
  }

  async updateAdvertisement(
    id: string,
    updateAdvertisementDto: UpdateAdvertisementDto,
  ) {
    const updatedAdvertisement = await this.advertisementsRepository.findOne(
      id,
    );
    if (!updatedAdvertisement) {
      throw new HttpException('Advertisement not found', HttpStatus.NOT_FOUND);
    }

    const updatedFields = Object.keys(
      pick(updateAdvertisementDto, advertisementFieldsForUpdate),
    );
    for (const field of updatedFields) {
      updatedAdvertisement[field] = updateAdvertisementDto[field];
    }

    if (updateAdvertisementDto.catIDs) {
      const cats: Cat[] = [];
      for (const catId of updateAdvertisementDto.catIDs) {
        cats.push(await this.catsService.getCatById(catId));
      }
      updatedAdvertisement.cats = cats;
    }

    await this.advertisementsRepository.save(updatedAdvertisement);
    return updatedAdvertisement;
  }

  async deleteAdvertisement(id: string) {
    await this.updateAdvertisement(id, {
      isDeleted: true,
      deletionDate: new Date().toISOString(),
    });
  }
}
