import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {UsersService} from "./users.service";
import {User} from "./entities/user.entity";
import {CreateUserDto, UpdateUserDto} from "./dto/user-dto";


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

    @Get()
    getAllUsers(): Promise<User[]>  {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: string): Promise<User> {
        return this.usersService.getUserById(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(createUserDto);
    }

    @Put()
    updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.updateUser(updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        return this.usersService.deleteUser(id);
    }
}