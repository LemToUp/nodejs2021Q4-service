import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users = await this.userService.getAll();
    // map user fields to exclude secret fields like "password"
    return users.map(UserModel.toResponse);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async findOne(@Param() params: { userId: string }) {
    const { userId } = params;
    const user = await this.userService.get(userId);

    if (!user) throw new HttpException('User not found', 404);
    // map user fields to exclude secret fields like "password"
    return UserModel.toResponse(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: { name: string, login: string, password: string }) {
    const { name, login, password } = body;
    const user = await this.userService.create(name, login, password);

    return UserModel.toResponse(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId')
  async update(@Param('userId') userId: string, @Body() body: { name: string | undefined, login: string | undefined, pass: string | undefined }) {
    const { name, login, pass } = body;
    await this.userService.update(userId, name, login, pass);

    const user = await this.userService.get(userId);

    if (!user) throw new HttpException('User not found', 404);

    return UserModel.toResponse(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    const user = await this.userService.get(userId);

    if (!user) throw new HttpException('User not found', 404);

    await this.userService.remove(userId);

    // map user fields to exclude secret fields like "password"
    return UserModel.toResponse(user);
  }
}
