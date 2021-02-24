import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/user-dto";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

const wrongCredentialsErrorMessage = 'Wrong credentials provided';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    public async registerUser(createUserDto: CreateUserDto) {
        if (!createUserDto.password)
            throw new HttpException('Field password required', HttpStatus.BAD_REQUEST);

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const createdUser = await this.usersService.createUser({
                ...createUserDto,
                password: hashedPassword
            });
            createdUser.password = undefined;
            return createdUser;
    }

    public async getAuthenticatedUser(emailOrUsername: string, enteredPassword: string) {
        try {
            const user = await this.usersService.getUserByEmail(emailOrUsername);
            await AuthService.verifyPassword(enteredPassword, user.password);
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException(wrongCredentialsErrorMessage, HttpStatus.BAD_REQUEST);
        }
    }

    private static async verifyPassword(enteredPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            enteredPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException(wrongCredentialsErrorMessage, HttpStatus.BAD_REQUEST);
        }
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}