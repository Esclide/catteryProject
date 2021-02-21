import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {Cat} from "./entities/cat.entity";
import {Breed} from "./entities/breed.entity";

@Injectable()
export class CatsService {
  constructor(
      @InjectRepository(Cat)
      private usersRepository: Repository<Cat>
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class BreedsService {
  constructor(
      @InjectRepository(Breed)
      private usersRepository: Repository<Breed>
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}