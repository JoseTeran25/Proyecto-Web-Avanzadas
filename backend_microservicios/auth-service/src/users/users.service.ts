// auth-service/src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  /**
   * Obtiene la información de un usuario por su ID.
   */
  async findById(userId: number): Promise<User> {
    const user = await this.userModel.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'role'], // No incluir la contraseña por seguridad
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    return user;
  }

  /**
   * Obtiene la lista de todos los usuarios (Opcional).
   */
  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: ['id', 'name', 'email', 'role'], // No devolver la contraseña
    });
  }
}
