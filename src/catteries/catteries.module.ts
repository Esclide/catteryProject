import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Cattery } from './entities/cattery.entity';
import { CatteriesController } from './catteries.controller';
import { CatteriesService } from './catteries.service';
import { CatsModule } from '../cats/cats.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cattery]), UsersModule, CatsModule],
  controllers: [CatteriesController],
  providers: [CatteriesService],
  exports: [CatteriesService],
})
export class CatteriesModule {}
