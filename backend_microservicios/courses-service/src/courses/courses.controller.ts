// courses-service/src/courses/courses.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAllCourses();
  }

  @Post()
  create(@Body() dto: { title: string; description: string; professorId: number }) {
    return this.coursesService.createCourse(dto.title, dto.description, dto.professorId);
  }
}
