// grades-service/src/grades/grades.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Grade } from './grade.model';
import axios from 'axios';

@Injectable()
export class GradesService {
  constructor(@InjectModel(Grade) private gradeModel: typeof Grade) {}

  async createGrade(courseId: number, professorId: number, studentId: number, gradeValue: number) {
    // Validar si el estudiante/profesor existen (auth-service), si el curso existe (courses-service):
    // const user = await axios.get(`http://localhost:4001/auth/${studentId}`);
    // const course = await axios.get(`http://localhost:4002/courses/${courseId}`);
    // ...

    return this.gradeModel.create({ courseId, professorId, studentId, grade: gradeValue });
  }

  async getGradesByStudent(studentId: number) {
    return this.gradeModel.findAll({ where: { studentId } });
  }

  async updateGrade(gradeId: number, newGrade: number) {
    const [rows, [updated]] = await this.gradeModel.update(
      { grade: newGrade },
      { where: { id: gradeId }, returning: true },
    );
    return updated || null;
  }

  async deleteGrade(gradeId: number) {
    return this.gradeModel.destroy({ where: { id: gradeId } });
  }
}
