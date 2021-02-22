import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {BreedsService, CatsService} from './cats.service';
import {CreateCatDto, UpdateCatDto} from "./dto/cat-dto";
import {Cat} from "./entities/cat.entity";
import {Breed} from "./entities/breed.entity";

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) { }

  @Get()
  getAllCats(): Promise<Cat[]>  {
    return this.catsService.getAllCats();
  }

  @Get(':id')
  getCatById(@Param('id') id: string): Promise<Cat> {
    return this.catsService.getCatById(id);
  }

  @Post()
  createCat(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.createCat(createCatDto);
  }

  @Put()
  updateCat(@Body() updateCatDto: UpdateCatDto): Promise<Cat> {
    return this.catsService.updateCat(updateCatDto);
  }

  @Delete(':id')
  async deleteCat(@Param('id') id: string): Promise<void> {
    return this.catsService.deleteCat(id);
  }
}

@Controller('breeds')
export class BreedsController {
  constructor(private breedsService: BreedsService) { }

  @Get()
  getAllBreeds(): Promise<Breed[]>  {
    return this.breedsService.getAllBreeds();
  }

  @Get(':id')
  getBreedById(@Param('id') id: string): Promise<Breed> {
    return this.breedsService.getBreedById(id);
  }

  @Post()
  createBreed(@Body() createUserDto: CreateCatDto): Promise<Breed> {
    return this.breedsService.createBreed(createUserDto);
  }

  @Put()
  updateBreed(@Body() updateUserDto: UpdateCatDto): Promise<Breed> {
    return this.breedsService.updateBreed(updateUserDto);
  }

  @Delete(':id')
  async deleteBreed(@Param('id') id: string): Promise<void> {
    return this.breedsService.deleteBreed(id);
  }
}