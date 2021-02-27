import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.usersRepository.find();
    return users
      .map((user) => {
        if (!user.isDeleted) return user;
      })
      .filter(function (user) {
        return user !== undefined;
      });
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (user && !user.isDeleted) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user && !user.isDeleted) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getUserByUsername(username: string) {
    const user = await this.usersRepository.findOne({ username });
    if (user && !user.isDeleted) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getOwnedCatsByUserId(id: string) {
    const user = await this.usersRepository.findOne(id, {
      relations: ['ownedCats'],
    });
    if (user && !user.isDeleted) {
      return user.ownedCats;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getBredCatsByUserId(id: string) {
    const user = await this.usersRepository.findOne(id, {
      relations: ['bredCats'],
    });
    if (user && !user.isDeleted) {
      return user.bredCats;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getFullUserInfo(id: string) {
    const user = await this.usersRepository.findOne(id, {
      relations: ['bredCats', 'ownedCats', 'createdAdvertisements'],
    });
    if (user && !user.isDeleted) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async createUser(createUserDto: CreateUserDto) {
    await this.checkUniqueFieldsForCreate(createUserDto);
    if (createUserDto.image)
      createUserDto.image = await bcrypt.hash(createUserDto.image, 10);
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.checkUniqueFieldsForUpdate(updateUserDto);
    if (updateUserDto.image)
      updateUserDto.image = await bcrypt.hash(updateUserDto.image, 10);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOne(id);
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async deleteUser(id: string) {
    await this.updateUser(id, {
      isDeleted: true,
      deletionDate: new Date().toISOString(),
    });
  }

  async checkIfEmailUses(email: string) {
    const user = await this.usersRepository.findOne({ email });
    return !!user;
  }

  async checkIfUsernameUses(username: string) {
    const user = await this.usersRepository.findOne({ username });
    return !!user;
  }

  async checkUniqueFieldsForCreate(
    createUserDto: CreateUserDto,
  ): Promise<void> {
    if (await this.checkIfEmailUses(createUserDto.email))
      throw new HttpException(
        'User with that email already exists',
        HttpStatus.BAD_REQUEST,
      );
    if (await this.checkIfUsernameUses(createUserDto.username))
      throw new HttpException(
        'User with that username already exists',
        HttpStatus.BAD_REQUEST,
      );
  }

  async checkUniqueFieldsForUpdate(
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    if (
      updateUserDto.email &&
      (await this.checkIfEmailUses(updateUserDto.email))
    )
      throw new HttpException(
        'User with that email already exists',
        HttpStatus.BAD_REQUEST,
      );
    if (
      updateUserDto.username &&
      (await this.checkIfUsernameUses(updateUserDto.username))
    )
      throw new HttpException(
        'User with that username already exists',
        HttpStatus.BAD_REQUEST,
      );
  }
}
