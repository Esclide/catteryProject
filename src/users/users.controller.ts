import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {UsersService} from "./users.service";
import {User} from "./entities/user.entity";
import {CreateUserDto, UpdateUserDto} from "./dto/user-dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {GetOneParam} from '../../utils/validators/get-one-param.validator'


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

    @Get()
    getAllUsers(): Promise<User[]>  {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getUserById(@Param() {id}: GetOneParam): Promise<User> {
        return this.usersService.getUserById(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(createUserDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        return this.usersService.deleteUser(id);
    }
}