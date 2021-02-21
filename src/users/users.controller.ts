import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user-dto";
import {UpdateUserDto} from "./dto/update-user-dto";
import {User} from "./entities/user.entity";


@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

    @Get()
    getAllUsers(): Promise<User[]>  {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Put()
    updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        return this.userService.deleteUser(id);
    }
}