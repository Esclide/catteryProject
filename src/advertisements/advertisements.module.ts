import { Module } from '@nestjs/common';
import { AdvertisementsController } from './advertisements.controller';
import { AdvertisementsService } from './advertisements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisement } from './entities/advertisement.entity';
import { CatsModule } from '../cats/cats.module';
import { UsersModule } from '../users/users.module';
import { AdvertisementAttachments } from './entities/advertisement-attachments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Advertisement, AdvertisementAttachments]),
    CatsModule,
    UsersModule,
  ],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
})
export class AdvertisementsModule {}
