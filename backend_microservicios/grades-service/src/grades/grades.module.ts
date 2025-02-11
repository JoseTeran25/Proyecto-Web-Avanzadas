// src/grades/grades.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { Grade } from './grades.model';

@Module({
  imports: [SequelizeModule.forFeature([Grade])], // Importar modelo de Grade
  controllers: [GradesController], // Registrar el controlador
  providers: [GradesService], // Registrar el servicio
  exports: [GradesService], // Exportar servicio si otros módulos lo necesitan
})
export class GradesModule {}
