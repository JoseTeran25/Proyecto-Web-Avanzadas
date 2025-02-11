// auth-service/src/users/users.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])], // Registrar modelo en el módulo
  controllers: [UsersController], // Registrar controlador
  providers: [UsersService], // Registrar servicio
  exports: [UsersService], // Exportar para ser usado en otros módulos si es necesario
})
export class UsersModule {}
