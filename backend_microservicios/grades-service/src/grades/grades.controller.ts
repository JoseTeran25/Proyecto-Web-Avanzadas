// src/grades/grades.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GradesService } from './grades.service';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  /**
   * Crea una nueva calificación.
   */
  @Post()
  async createGrade(@Body() body: { courseId: number; professorId: number; studentId: number; grade: number }) {
    return this.gradesService.createGrade(body.courseId, body.professorId, body.studentId, body.grade);
  }

  /**
   * Obtiene todas las calificaciones de un estudiante.
   */
  @Get('student/:studentId')
  async getGradesByStudent(@Param('studentId') studentId: number) {
    return this.gradesService.getGradesByStudent(studentId);
  }

  /**
   * Obtiene todas las calificaciones de un curso.
   */
  @Get('course/:courseId')
  async getGradesByCourse(@Param('courseId') courseId: number) {
    return this.gradesService.getGradesByCourse(courseId);
  }

  /**
   * Actualiza una calificación.
   */
  @Put(':gradeId')
  async updateGrade(@Param('gradeId') gradeId: number, @Body() body: any) {
    console.log(`Updating grade ID: ${gradeId}, with value:`, body);
    return this.gradesService.updateGrade(gradeId, body.grade);
  }

  /**
   * Elimina una calificación.
   */
  @Delete(':gradeId')
  async deleteGrade(@Param('gradeId') gradeId: number) {
    return this.gradesService.deleteGrade(gradeId);
  }
}
