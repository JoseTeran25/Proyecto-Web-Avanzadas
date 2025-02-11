// api-gateway/src/auth/auth.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  private readonly AUTH_SERVICE_URL = 'http://localhost:4001/auth';

  constructor(private readonly httpService: HttpService) {}

  @Post('signup')
  async signup(@Body() data: any) {
    return lastValueFrom(this.httpService.post(`${this.AUTH_SERVICE_URL}/signup`, data));
  }

  @Post('login')
  async login(@Body() data: any) {
    return lastValueFrom(this.httpService.post(`${this.AUTH_SERVICE_URL}/login`, data));
  }

  @Get('user/:id')
  async getUser(@Param('id') id: number) {
    return lastValueFrom(this.httpService.get(`${this.AUTH_SERVICE_URL}/user/${id}`));
  }
}
