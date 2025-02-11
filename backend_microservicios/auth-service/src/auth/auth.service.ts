// auth-service/src/auth/auth.service.ts
import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  private readonly SECRET_KEY: string;
  private readonly EMAIL_USER: string;
  private readonly EMAIL_PASS: string;

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly configService: ConfigService,
  ) {
    this.SECRET_KEY = this.configService.get<string>('SECRET_KEY') || 'default_secret_key';
    this.EMAIL_USER = this.configService.get<string>('EMAIL_USER');
    this.EMAIL_PASS = this.configService.get<string>('EMAIL_PASS');
  }

  /**
   * Registro de usuario.
   * @param userData - Datos del usuario.
   */
  async signup(userData: Partial<User>): Promise<Omit<User, 'password'>> {
    const { email, password } = userData;

    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User already exists with this email.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      ...userData,
      password: hashedPassword,
    });

    return this.excludePassword(newUser);
  }

  /**
   * Inicio de sesión y generación de JWT.
   * @param email - Correo del usuario.
   * @param password - Contraseña.
   */
  async login(email: string, password: string): Promise<{ token: string; user: Omit<User, 'password'> }> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.SECRET_KEY,
      { expiresIn: '1d' }
    );

    return { token, user: this.excludePassword(user) };
  }

  /**
   * Recuperar contraseña: Envío de correo con enlace de recuperación.
   * @param email - Correo del usuario.
   */
  async recoverPassword(email: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('No user found with this email.');
    }

    const token = jwt.sign({ id: user.id }, this.SECRET_KEY, { expiresIn: '1h' });
    const recoveryLink = `http://localhost:3000/recuperar?id=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.EMAIL_USER,
        pass: this.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: this.EMAIL_USER,
      to: email,
      subject: 'Password Recovery',
      html: `
        <p>Hola ${user.name},</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el enlace de abajo para continuar:</p>
        <a href="${recoveryLink}" target="_blank">${recoveryLink}</a>
        <p>Si no solicitaste este cambio, ignora este correo.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return { message: 'Recovery email sent successfully.' };
  }

  /**
   * Restablecer contraseña: Verificación de token y actualización de contraseña.
   * @param token - Token de recuperación.
   * @param newPassword - Nueva contraseña.
   */
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    let userId: number;

    try {
      const decoded = jwt.verify(token, this.SECRET_KEY) as { id: number };
      userId = decoded.id;
    } catch (error) {
      throw new BadRequestException('Invalid or expired token.');
    }

    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    return { message: 'Password updated successfully.' };
  }

  /**
   * Obtiene un usuario por ID (sin incluir la contraseña).
   * @param id - ID del usuario.
   */
  async findById(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return this.excludePassword(user);
  }

  /**
   * Excluye la contraseña del objeto usuario.
   * @param user - Objeto usuario.
   */
  private excludePassword(user: User): any {
    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }
}
