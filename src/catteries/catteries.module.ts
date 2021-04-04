import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Cattery } from './entities/cattery.entity';
import { CatteriesController } from './catteries.controller';
import { CatteriesService } from './catteries.service';
import { CatsModule } from '../cats/cats.module';
import { ApplicationToCattery } from './entities/application-to-cattery.entity';
import { UserInCattery } from './entities/user-in-cattery.entity';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cattery, UserInCattery, ApplicationToCattery]),
    CatsModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [CatteriesController, ApplicationsController],
  providers: [CatteriesService, ApplicationsService],
  exports: [CatteriesService, ApplicationsService],
})
export class CatteriesModule {}
