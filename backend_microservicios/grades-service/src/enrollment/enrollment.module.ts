// src/grades/grades.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SequelizeModule } from '@nestjs/sequelize';
import { Enrollment } from './enrollment.model';

@Module({
  imports: [SequelizeModule.forFeature([Enrollment]), HttpModule,], // Importar modelo de Grade
})
export class EnrollmentModule {}
