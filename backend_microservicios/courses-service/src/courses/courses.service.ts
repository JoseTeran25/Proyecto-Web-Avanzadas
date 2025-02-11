// courses-service/src/courses/courses.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './course.model';
import axios from 'axios';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course) private courseModel: typeof Course) {}

  async createCourse(title: string, description: string, professorId: number) {
    // En un microservicio real, deberías validar si el "professorId" existe en auth-service:
    // const response = await axios.get(`http://localhost:4001/auth/${professorId}`);
    // if (!response.data || response.data.role !== 'professor') {
    //   throw new HttpException('Invalid professor ID', HttpStatus.BAD_REQUEST);
    // }

    return this.courseModel.create({ title, description, professorId });
  }

  async findAllCourses() {
    return this.courseModel.findAll();
  }
}
