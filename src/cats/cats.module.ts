import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import {BreedsService, CatsService} from './cats.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cat} from "./entities/cat.entity";
import {Breed} from "./entities/breed.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat, Breed])
  ],
  controllers: [CatsController],
  providers: [CatsService, BreedsService],
})
export class CatsModule {}
