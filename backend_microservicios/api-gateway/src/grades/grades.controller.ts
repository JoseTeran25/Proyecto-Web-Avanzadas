// api-gateway/src/grades/grades.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('grades')
export class GradesController {
  private readonly GRADES_SERVICE_URL = 'http://localhost:4002/grades';

  constructor(private readonly httpService: HttpService) {}

  @Get('student/:studentId')
  async getGradesByStudent(@Param('studentId') studentId: number) {
    return lastValueFrom(this.httpService.get(`${this.GRADES_SERVICE_URL}/student/${studentId}`));
  }

  @Post()
  async createGrade(@Body() data: any) {
    return lastValueFrom(this.httpService.post(`${this.GRADES_SERVICE_URL}`, data));
  }
}
