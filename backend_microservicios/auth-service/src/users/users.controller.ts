// auth-service/src/users/users.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Obtiene un usuario por su ID.
   */
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  /**
   * Obtiene la lista de todos los usuarios (Opcional).
   */
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
