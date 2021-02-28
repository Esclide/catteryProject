import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BreedsService, CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './dto/cat-dto';
import { Cat } from './entities/cat.entity';
import { Breed } from './entities/breed.entity';
import { CreateBreedDto, UpdateBreedDto } from './dto/breed-dto';
import { GetOneParam } from '../../utils/validators/get-one-param.validator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCatAttachmentDto } from './dto/cat-attachment-dto';
import { CatAttachments } from './entities/cat-attachments.entity';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getAllCats(): Promise<Cat[]> {
    return this.catsService.getAllCats();
  }

  @Get(':id')
  getCatById(@Param() { id }: GetOneParam): Promise<Cat> {
    return this.catsService.getCatById(id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post()
  createCat(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.createCat(createCatDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateCat(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    return this.catsService.updateCat(id, updateCatDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCat(@Param('id') id: string): Promise<void> {
    return this.catsService.deleteCat(id);
  }

  @Get(':id/attach')
  getCatAttachments(@Param() { id }: GetOneParam): Promise<CatAttachments[]> {
    return this.catsService.getCatAttachments(id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post(':id/attach')
  addAttachments(
    @Param() { id }: GetOneParam,
    @Body() createCatAttachmentDtoArray: CreateCatAttachmentDto[],
  ): Promise<CatAttachments[]> {
    return this.catsService.addAttachments(id, createCatAttachmentDtoArray);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete(':catId/attach/:attachId')
  deleteAttachment(
    @Param('catId') catId: string,
    @Param('attachId') attachId: string,
  ): Promise<void> {
    return this.catsService.deleteAttachment(catId, attachId);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Put(':catId/attach/:attachId/main')
  setMainPhoto(
    @Param('catId') catId: string,
    @Param('attachId') attachId: string,
  ): Promise<void> {
    return this.catsService.setMainPhoto(catId, attachId);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get(':catId/attach/main')
  getMainPhoto(@Param('catId') catId: string): Promise<CatAttachments> {
    return this.catsService.getCatMainPhoto(catId);
  }
}

@Controller('breeds')
export class BreedsController {
  constructor(private breedsService: BreedsService) {}

  @Get()
  getAllBreeds(): Promise<Breed[]> {
    return this.breedsService.getAllBreeds();
  }

  @Get(':id')
  getBreedById(@Param() { id }: GetOneParam): Promise<Breed> {
    return this.breedsService.getBreedById(id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post()
  createBreed(@Body() createBreedDto: CreateBreedDto): Promise<Breed> {
    return this.breedsService.createBreed(createBreedDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateBreed(
    @Param('id') id: string,
    @Body() updateBreedDto: UpdateBreedDto,
  ): Promise<Breed> {
    return this.breedsService.updateBreed(id, updateBreedDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteBreed(@Param('id') id: string): Promise<void> {
    return this.breedsService.deleteBreed(id);
  }
}
