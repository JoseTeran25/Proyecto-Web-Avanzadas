// courses-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GradesModule } from './grades/grades.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { CourseModule } from './courses/course.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'grades_db',
      autoLoadModels: true,
      synchronize: true,
    }),
    GradesModule,
    EnrollmentModule,
    CourseModule
  ],
})
export class AppModule { }
