// courses-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GradesModule } from './grades/grades.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'grades_db',
      autoLoadModels: true,
      synchronize: false,
    }),
    GradesModule,
  ],
})
export class AppModule { }
