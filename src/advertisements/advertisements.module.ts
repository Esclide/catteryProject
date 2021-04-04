import { forwardRef, Module } from '@nestjs/common';
import { AdvertisementsController } from './advertisements.controller';
import { AdvertisementsService } from './advertisements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisement } from './entities/advertisement.entity';
import { CatsModule } from '../cats/cats.module';
import { UsersModule } from '../users/users.module';
import { AdvertisementAttachments } from './entities/advertisement-attachments.entity';
import { CatteriesModule } from '../catteries/catteries.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Advertisement, AdvertisementAttachments]),
    CatsModule,
    forwardRef(() => UsersModule),
    forwardRef(() => CatteriesModule)
  ],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
  exports: [AdvertisementsService],
})
export class AdvertisementsModule {}
