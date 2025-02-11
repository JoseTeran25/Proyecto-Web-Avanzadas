import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('grades')
export class GradesController {
  private readonly GRADES_SERVICE_URL = 'http://grades-service:4002/grades';

  constructor(private readonly httpService: HttpService) {}

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
}
