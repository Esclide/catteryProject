import { Controller, Get } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';

@Controller()
export class AdvertisementsController {
  constructor(private readonly appService: AdvertisementsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
