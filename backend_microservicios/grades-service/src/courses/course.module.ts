// src/grades/grades.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './course.model';

@Module({
  imports: [SequelizeModule.forFeature([Course]), HttpModule,], // Importar modelo de Grade
})
export class CourseModule {}
