// auth-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module'; // Importamos UsersModule

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres', // O 'mysql'
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'auth_db',
      models: [],       // Se cargarán desde cada módulo
      autoLoadModels: true,
      synchronize: false, // Pon true si deseas que Nest cree o altere tablas
      // logging: console.log, // Descomenta para ver logs de SQL
    }),
    AuthModule,
    UsersModule, // Agregamos UsersModule para que esté disponible en la aplicación
  ],
})
export class AppModule {}
