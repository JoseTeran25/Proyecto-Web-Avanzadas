// auth-service/src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async signup(userData: Partial<User>): Promise<User> {
    return this.userModel.create(userData);
  }

  async findById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  // Aquí puedes añadir login, recuperar contraseña, etc.
}
