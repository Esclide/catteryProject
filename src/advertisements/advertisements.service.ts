import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Advertisement} from "./entities/advertisement.entity";

@Injectable()
export class AdvertisementsService {
  constructor(
      @InjectRepository(Advertisement)
      private usersRepository: Repository<Advertisement>
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
}
