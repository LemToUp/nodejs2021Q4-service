
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { UserModel } from '../users/user.model';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(login: string, password: string): Promise<UserModel | null> {
        const user = await this.userService.getByLogin(login);

        if (user && user.password && bcrypt.compareSync(password, user.password)) {
            return user;
        }

        return null;
    }

    async getToken(login: string, password: string): Promise<string | null> {
        const user = await this.validateUser(login, password);

        if (!user) return null;

        return this.jwtService.sign({
            sub: user.id,
            userId: user.id,
            login: user.login,
        })
    }
}
