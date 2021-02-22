import { Module } from '@nestjs/common';
import {BreedsService, CatsService} from './cats.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cat} from "./entities/cat.entity";
import {Breed} from "./entities/breed.entity";
import {BreedsController, CatsController} from "./cats.controller";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat, Breed]), UsersModule
  ],
  controllers: [CatsController, BreedsController],
  providers: [BreedsService, CatsService],
})
export class CatsModule {}
