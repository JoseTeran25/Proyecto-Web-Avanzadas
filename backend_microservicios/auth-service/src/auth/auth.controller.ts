// auth-service/src/auth/auth.controller.ts
import { Controller, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registro de usuario.
   */
  @Post('signup')
  async signup(@Body() body: Partial<User>) {
    const newUser = await this.authService.signup(body);
    return { message: 'User created successfully', user: newUser };
  }

  /**
   * Inicio de sesión.
   */
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const result = await this.authService.login(email, password);
    return result;
  }

  /**
   * Recuperar contraseña: Enviar correo con link de recuperación.
   */
  @Post('recover-password')
  async recoverPassword(@Body() body: { email: string }) {
    const { email } = body;
    if (!email) {
      throw new BadRequestException('Email is required.');
    }
    return this.authService.recoverPassword(email);
  }

  /**
   * Restablecer contraseña.
   */
  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    const { token, newPassword } = body;
    if (!token || !newPassword) {
      throw new BadRequestException('Token and new password are required.');
    }
    return this.authService.resetPassword(token, newPassword);
  }
}
