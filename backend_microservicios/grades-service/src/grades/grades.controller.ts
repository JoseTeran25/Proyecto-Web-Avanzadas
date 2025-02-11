// grades-service/src/grades/grades.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { GradesService } from './grades.service';

@Controller('grades')
export class GradesController {
  constructor(private gradesService: GradesService) {}

  @Post()
  async create(@Body() dto: { courseId: number, professorId: number, studentId: number, grade: number }) {
    const newGrade = await this.gradesService.createGrade(
      dto.courseId,
      dto.professorId,
      dto.studentId,
      dto.grade,
    );
    return { message: 'Grade created', grade: newGrade };
  }

  @Get('student/:studentId')
  async getByStudent(@Param('studentId') studentId: number) {
    return this.gradesService.getGradesByStudent(studentId);
  }

  @Put(':gradeId')
  async update(@Param('gradeId') gradeId: number, @Body() dto: { grade: number }) {
    const updated = await this.gradesService.updateGrade(gradeId, dto.grade);
    if (!updated) return { error: 'Grade not found' };
    return { message: 'Grade updated', grade: updated };
  }

  @Delete(':gradeId')
  async delete(@Param('gradeId') gradeId: number) {
    const deleted = await this.gradesService.deleteGrade(gradeId);
    if (!deleted) return { error: 'Grade not found' };
    return { message: 'Grade deleted' };
  }
}
