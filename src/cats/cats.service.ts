import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Cat} from "./entities/cat.entity";
import {Breed} from "./entities/breed.entity";
import {CreateCatDto, UpdateCatDto} from "./dto/cat-dto";
import {CreateBreedDto, UpdateBreedDto} from "./dto/breed-dto";
import {UsersService} from "../users/users.service";

const mediaFolder = '../media/';

@Injectable()
export class BreedsService {
  constructor(
      @InjectRepository(Breed)
      private breedsRepository: Repository<Breed>
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
      await this.checkNotNullableFields(createBreedDto);
      if (createBreedDto.image) createBreedDto.image = `${mediaFolder}${createBreedDto.image}`
      const newBreed = await this.breedsRepository.create(createBreedDto);
      await this.breedsRepository.save(newBreed);
      return newBreed;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateBreed(updateBreedDto: UpdateBreedDto) {
    await this.breedsRepository.update(updateBreedDto.id, updateBreedDto);
    const updatedCat = await this.breedsRepository.findOne(updateBreedDto.id);
    if (updatedCat) {
      return updatedCat
    }
    throw new HttpException('Breed not found', HttpStatus.NOT_FOUND);
  }

  async deleteBreed(id: string) {
    const deleteResponse = await this.breedsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Breed not found', HttpStatus.NOT_FOUND);
    }
  }

  async checkNotNullableFields(createBreedDto: CreateBreedDto): Promise<void> {
    const notNullableFields = ['name']
    for (const field of notNullableFields){
      if (!createBreedDto[field])
        throw new HttpException(`Field ${field} required`, HttpStatus.BAD_REQUEST);
    }
  }

  async checkIfNameUses(name: string) {
    const breed = await this.breedsRepository.findOne({ name })
    return !!breed;
  }
}

@Injectable()
export class CatsService {

  constructor(
      @InjectRepository(Cat)
      private readonly catsRepository: Repository<Cat>,
      private readonly usersService: UsersService,
      private readonly breedsService: BreedsService
  ) {}

  getAllCats() {
    return this.catsRepository.find();
  }

  async getCatById(id: string) {
    const cat = await this.catsRepository.findOne(id);
    if (cat) {
      return cat;
    }
    throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
  }

  async getCatsByUserId(userId: string) {
    return this.usersService.getCatsByUserId(userId);
  }

  async getFullCatInfoById(id: string) {
    const cat = await this.catsRepository.findOne(id, {relations: ['breeder', 'owner',  'breed']});
    if (cat) {
      return cat;
    }
    throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
  }

  async createCat(createCatDto: CreateCatDto) {
    await this.checkNotNullableFields(createCatDto);
    const newCat = await this.catsRepository.create(createCatDto);
    newCat.owner = await this.usersService.getUserById(createCatDto.ownerId)
    newCat.breeder = await this.usersService.getUserById(createCatDto.breederId)
    newCat.breed = await this.breedsService.getBreedById(createCatDto.breedId)
    await this.catsRepository.save(newCat);
    return newCat;
  }

  async updateCat(updateCatDto: UpdateCatDto) {
    await this.catsRepository.update(updateCatDto.id, updateCatDto);
    const updatedCat = await this.catsRepository.findOne(updateCatDto.id);
    if (updatedCat) {
      return updatedCat
    }
    throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
  }

  async deleteCat(id: string) {
    const deleteResponse = await this.catsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }
  }

  async checkNotNullableFields(createCatDto: CreateCatDto): Promise<void> {
    const notNullableFields = ['name', 'gender', 'breederId', 'ownerId', 'breedId', 'color', 'birthDate']
    for (const field of notNullableFields){
      if (!createCatDto[field])
        throw new HttpException(`Field ${field} required`, HttpStatus.BAD_REQUEST);
    }
  }
}
