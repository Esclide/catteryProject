import {Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from "../users/dto/user-dto";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import RequestForLogIn from "./request-for-log-in.interface";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @HttpCode(200)
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.registerUser(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async logIn(@Req() request: RequestForLogIn) {
        const user = request.user;
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() request) {
        return request.user;
    }
}