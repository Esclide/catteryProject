import {
  Body,
  Controller,
  Delete, forwardRef,
  Get, Inject,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetOneParam } from '../../utils/validators/get-one-param.validator';
import { Cat } from '../cats/entities/cat.entity';
import { Cattery } from '../catteries/entities/cattery.entity';
import { CatteriesService } from '../catteries/catteries.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @Inject(forwardRef(() => CatteriesService))
    private readonly catteriesService: CatteriesService,
  ) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id/catteries/lead')
  getUserLeadCatteries(@Param() { id }: GetOneParam): Promise<Cattery[]> {
    return this.usersService.getUserLeadCatteries(id);
  }

  @Get(':id')
  getUserById(@Param() { id }: GetOneParam): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Get(':id/bred_cats')
  getBredCatsByUserId(@Param() { id }: GetOneParam): Promise<Cat[]> {
    return this.usersService.getBredCatsByUserId(id);
  }

  @Get(':id/owned_cats')
  getOwnedCatsByUserId(@Param() { id }: GetOneParam): Promise<Cat[]> {
    return this.usersService.getOwnedCatsByUserId(id);
  }

  @Get(':id/catteries')
  getAllUserCatteries(@Param() { id }: GetOneParam): Promise<Cattery[]> {
    return this.catteriesService.getAllUserCatteries(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
