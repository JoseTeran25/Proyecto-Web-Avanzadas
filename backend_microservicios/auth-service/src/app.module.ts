// auth-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres', // O 'mysql'
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'auth_db',
      models: [],       // Se cargarán desde cada Módulo
      autoLoadModels: true,
      synchronize: false, // Pon true si deseas que Nest cree o altere tablas
      // logging: console.log, // Descomenta para ver logs de SQL
    }),
    UsersModule,
  ],
})
export class AppModule {}
