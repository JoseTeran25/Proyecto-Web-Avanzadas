// courses-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GradesModule } from './grades/grades.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'main_db',
      autoLoadModels: true,
      synchronize: true,
    }),
    GradesModule,
  ],
})
export class AppModule { }
