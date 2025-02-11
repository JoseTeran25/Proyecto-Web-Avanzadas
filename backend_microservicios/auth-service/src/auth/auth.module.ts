// auth-service/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/users/user.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forFeature([User]), // Importamos el modelo User
    ConfigModule, // Para acceder a variables de entorno
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Exportamos el servicio para otros módulos si es necesario
})
export class AuthModule {}
