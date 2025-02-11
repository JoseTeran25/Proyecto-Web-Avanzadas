// auth-service/src/users/users.controller.ts
import { Controller, Get, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() body: Partial<User>) {
    const newUser = await this.usersService.signup(body);
    return { message: 'User created successfully', user: newUser };
  }

  @Get(':id')
  async findUser(@Param('id') id: number) {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
