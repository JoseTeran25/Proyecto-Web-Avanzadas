import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, catchError } from 'rxjs';

@Controller('auth')
export class AuthController {
  private readonly AUTH_SERVICE_URL = 'http://auth-service:4001/auth';

  constructor(private readonly httpService: HttpService) {}

  @Post('signup')
  async signup(@Body() data: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.AUTH_SERVICE_URL}/signup`, data)
      );
      return response.data; // 🔹 Retorna solo los datos sin la estructura de Axios
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error en el servicio de autenticación',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('login')
  async login(@Body() data: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.AUTH_SERVICE_URL}/login`, data)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error en el servicio de autenticación',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('user/:id')
  async getUser(@Param('id') id: number) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.AUTH_SERVICE_URL}/user/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error en el servicio de autenticación',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
