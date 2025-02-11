// src/grades/grades.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Grade } from './grades.model';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GradesService {
    private readonly USERS_SERVICE_URL = 'http://localhost:4001/users';

    constructor(
        @InjectModel(Grade)
        private readonly gradeModel: typeof Grade,

        private readonly sequelize: Sequelize,

        private readonly httpService: HttpService // Para consultar el microservicio de users
    ) {}

    /**
     * Obtiene la información de un usuario desde el microservicio de users.
     */
    private async fetchUserById(userId: number) {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.USERS_SERVICE_URL}/${userId}`)
            );
            return response.data;
        } catch (error) {
            throw new NotFoundException(`User with ID ${userId} not found.`);
        }
    }

    /**
     * Crea una nueva calificación.
     */
    async createGrade(courseId: number, professorId: number, studentId: number, grade: number) {
        if (!courseId || !professorId || !studentId || grade === undefined) {
            throw new BadRequestException('Missing required fields.');
        }

        const newGrade = await this.gradeModel.create({
            courseId,
            professorId,
            studentId,
            grade,
        });

        return { message: 'Grade created successfully.', grade: newGrade };
    }

    /**
     * Obtiene todas las calificaciones de un estudiante.
     */
    async getGradesByStudent(studentId: number) {
        const grades = await this.gradeModel.findAll({ where: { studentId } });

        if (!grades.length) {
            throw new NotFoundException('No grades found for this student.');
        }

        return grades;
    }

    /**
     * Obtiene todas las calificaciones de un curso con los detalles de los estudiantes desde el microservicio de users.
     */
    async getGradesByCourse(courseId: number) {
        if (!courseId || isNaN(courseId)) {
            throw new BadRequestException('Invalid course ID.');
        }

        // Obtener calificaciones del curso sin los detalles de los estudiantes
        const gradesQuery = `
            SELECT
                g.id AS grade_id,
                g.courseId AS course_id,
                g.studentId AS student_id,
                g.professorId AS professor_id,
                g.grade AS grade
            FROM "GRADES" g
            WHERE g."courseId" = ?;
        `;

        const grades: any = await this.sequelize.query(gradesQuery, {
            replacements: [courseId],
            type: QueryTypes.SELECT,
        });

        if (!grades.length) {
            throw new NotFoundException('No grades found for this course.');
        }

        // Obtener los detalles de cada estudiante desde el microservicio de users
        const students = await Promise.all(
            grades.map((grade) => this.fetchUserById(grade.student_id))
        );

        // Enlazar estudiantes con sus calificaciones
        const studentsWithGrades = students.map((student, index) => ({
            ...student,
            grades: [grades[index]],
        }));

        return { courseId, students: studentsWithGrades };
    }

    /**
     * Actualiza una calificación.
     */
    async updateGrade(gradeId: number, newGrade: number) {
        if (newGrade === undefined) {
            throw new BadRequestException('Grade is required to update.');
        }

        const updatedGrade = await this.gradeModel.update(
            { grade: newGrade },
            { where: { id: gradeId }, returning: true }
        );

        if (updatedGrade[0] === 0) {
            throw new NotFoundException('Grade not found.');
        }

        return { message: 'Grade updated successfully.', grade: updatedGrade[1][0] };
    }

    /**
     * Elimina una calificación.
     */
    async deleteGrade(gradeId: number) {
        const deleted = await this.gradeModel.destroy({ where: { id: gradeId } });

        if (!deleted) {
            throw new NotFoundException('Grade not found.');
        }

        return { message: 'Grade deleted successfully.' };
    }
}
