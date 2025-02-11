import { Controller, Get, Post, Param, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('grade')
export class GradesController {
  private readonly GRADES_SERVICE_URL = 'http://grades-service:4002/grades';

  constructor(private readonly  httpService: HttpService) {}

  @Put(':gradeId')
  async updateGrade(@Param('gradeId') gradeId: number, @Body() body: { grade: number }) {
    try {
      const response = await lastValueFrom(
        this.httpService.put(`${this.GRADES_SERVICE_URL}/${gradeId}`, body)
      );
      return response.data; // 🔹 Solo devuelve los datos sin la estructura completa de Axios
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener las calificaciones',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  @Get('student/:studentId')
  async getGradesByStudent(@Param('studentId') studentId: number) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.GRADES_SERVICE_URL}/student/${studentId}`)
      );
      return response.data; // 🔹 Solo devuelve los datos sin la estructura completa de Axios
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener las calificaciones',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('course/:courseId')
  async getGradesByCourse(@Param('courseId') courseId: number) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.GRADES_SERVICE_URL}/course/${courseId}`)
      );
      return response.data; // 🔹 Solo devuelve los datos sin la estructura completa de Axios
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener las cursos',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  

  @Post()
  async createGrade(@Body() data: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.GRADES_SERVICE_URL}`, data)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al crear la calificación',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':gradeId')
  async deleteGrade(@Param('gradeId') gradeId: number) {
    try {
      const response = await lastValueFrom(
        this.httpService.delete(`${this.GRADES_SERVICE_URL}/${gradeId}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'OH YEAH',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
