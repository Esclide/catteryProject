import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { Breed } from './entities/breed.entity';
import { catFieldsForUpdate, CreateCatDto, UpdateCatDto } from './dto/cat-dto';
import { CreateBreedDto, UpdateBreedDto } from './dto/breed-dto';
import { UsersService } from '../users/users.service';
import { PostgresErrorCode } from '../database/postgres-error-codes.enum';
import pick from 'lodash/pick';

const mediaFolder = '../media/';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private breedsRepository: Repository<Breed>,
  ) {}

  getAllBreeds() {
    return this.breedsRepository.find();
  }

  async getBreedById(id: string) {
    const breed = await this.breedsRepository.findOne(id);
    if (breed) {
      return breed;
    }
    throw new HttpException('Breed not found', HttpStatus.NOT_FOUND);
  }

  async getBreedByName(name: string) {
    const breed = await this.breedsRepository.findOne({ name });
    if (breed) {
      return breed;
    }
    throw new HttpException('Breed not found', HttpStatus.NOT_FOUND);
  }

  async createBreed(createBreedDto: CreateBreedDto) {
    try {
      if (createBreedDto.image)
        createBreedDto.image = `${mediaFolder}${createBreedDto.image}`;
      const newBreed = await this.breedsRepository.create(createBreedDto);
      await this.breedsRepository.save(newBreed);
      return newBreed;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'Breed with that name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateBreed(id: string, updateBreedDto: UpdateBreedDto) {
    try {
      await this.breedsRepository.update(id, updateBreedDto);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'Breed with that name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const breed = await this.getBreedById(id);
    if (breed) {
      return breed;
    }
    throw new HttpException('Breed not found', HttpStatus.NOT_FOUND);
  }

  async deleteBreed(id: string) {
    const deleteResponse = await this.breedsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Breed not found', HttpStatus.NOT_FOUND);
    }
  }
}

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
    private readonly usersService: UsersService,
    private readonly breedsService: BreedsService,
  ) {}

  async getAllCats() {
    const cats = await this.catsRepository.find();
    return cats
      .map((cat) => {
        if (!cat.isDeleted) return cat;
      })
      .filter(function (cat) {
        return cat !== undefined;
      });
  }

  async getCatById(id: string) {
    const cat = await this.catsRepository.findOne(id, {
      relations: ['breeder', 'owner'],
    });
    if (cat && !cat.isDeleted) {
      return cat;
    }
    throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
  }

  async createCat(createCatDto: CreateCatDto) {
    const newCat = await this.catsRepository.create(createCatDto);
    newCat.owner = await this.usersService.getUserByUsername(
      createCatDto.ownerUsername,
    );
    newCat.breeder = await this.usersService.getUserByUsername(
      createCatDto.breederUsername,
    );
    newCat.breed = await this.breedsService.getBreedByName(
      createCatDto.breedName,
    );
    if (createCatDto.motherId)
      newCat.mother = await this.getCatById(createCatDto.motherId);
    if (createCatDto.fatherId)
      newCat.father = await this.getCatById(createCatDto.fatherId);
    await this.catsRepository.save(newCat);
    return newCat;
  }

  async updateCat(id: string, updateCatDto: UpdateCatDto) {
    const updatedCat = await this.catsRepository.findOne(id);
    if (!updatedCat) {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }

    const updatedFields = Object.keys(pick(updateCatDto, catFieldsForUpdate));
    for (const field of updatedFields) {
      updatedCat[field] = updateCatDto[field];
    }

    if (updateCatDto.ownerUsername)
      updatedCat.owner = await this.usersService.getUserByUsername(
        updateCatDto.ownerUsername,
      );
    if (updateCatDto.breedName)
      updatedCat.breed = await this.breedsService.getBreedByName(
        updateCatDto.breedName,
      );
    if (updateCatDto.motherId)
      updatedCat.mother = await this.getCatById(updateCatDto.motherId);
    if (updateCatDto.fatherId)
      updatedCat.father = await this.getCatById(updateCatDto.fatherId);
    await this.catsRepository.save(updatedCat);
    return updatedCat;
  }

  async deleteCat(id: string) {
    await this.updateCat(id, {
      isDeleted: true,
      deletionDate: new Date().toISOString(),
    });
  }
}
