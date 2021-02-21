import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { User } from './entities/user.entity';
import {CreateUserDto} from "./dto/create-user-dto";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UpdateUserDto} from "./dto/update-user-dto";

const mediaFolder = '../media/';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    getAllUsers() {
        return this.usersRepository.find();
    }

    async getUserById(id: string) {
        const user = await this.usersRepository.findOne(id);
        if (user) {
            return user;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async createUser(createUserDto: CreateUserDto) {
        await this.checkUniqueFields(createUserDto);
        await this.checkNotNullableFields(createUserDto);
        if (createUserDto.image) createUserDto.image = `${mediaFolder}${createUserDto.image}`
        const newUser = await this.usersRepository.create(createUserDto);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async updateUser(updateUserDto: UpdateUserDto) {
        await this.usersRepository.update(updateUserDto.id, updateUserDto);
        const updatedUser = await this.usersRepository.findOne(updateUserDto.id);
        if (updatedUser) {
            return updatedUser
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async deleteUser(id: string) {
        const deleteResponse = await this.usersRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async checkIfEmailUses(email: string) {
        const user = await this.usersRepository.findOne({ email })
        return !!user;
    }

    async checkIfUsernameUses(username: string) {
        const user = await this.usersRepository.findOne({ username })
        return !!user;
    }

    async checkNotNullableFields(createUserDto: CreateUserDto): Promise<void> {
        const notNullableFields = ['email', 'username', 'firstName', 'lastName', 'birthDate']
        for (const field of notNullableFields){
            if (!createUserDto[field])
                throw new HttpException(`Field ${field} required`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async checkUniqueFields(createUserDto: CreateUserDto): Promise<void> {
        if (await this.checkIfEmailUses(createUserDto.email))
            throw new HttpException('Email already in use', HttpStatus.INTERNAL_SERVER_ERROR);
        if (await this.checkIfUsernameUses(createUserDto.username))
            throw new HttpException('Username already in use', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}