import { Body, Controller, HttpException, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('login')
export class AuthController {
    constructor(private userService: UserService, private loginService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Body() body: { name: string, login: string, password: string }) {
        const { login, password } = body;
        const token = await this.loginService.getToken(login, password);

        if (!token) throw new HttpException('Auth error', 403);

        return { token };
    }
}
