import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CatteriesModule } from '../catteries/catteries.module';
import { ProfileController } from './profile.controller';
import { CatsModule } from '../cats/cats.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CatteriesModule),
    forwardRef(() => CatsModule),
  ],
  controllers: [UsersController, ProfileController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
