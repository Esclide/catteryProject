import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Cat } from '../cats/entities/cat.entity';
import { Breed } from '../cats/entities/breed.entity';
import { Advertisement } from '../advertisements/entities/advertisement.entity';
import { AdvertisementAttachments } from '../advertisements/entities/advertisement-attachments.entity';
import { CatAttachments } from '../cats/entities/cat-attachments.entity';
import { Cattery } from '../catteries/entities/cattery.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          User,
          Cat,
          Breed,
          Advertisement,
          AdvertisementAttachments,
          CatAttachments,
          Cattery,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
