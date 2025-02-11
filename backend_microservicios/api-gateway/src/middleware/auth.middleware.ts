// api-gateway/src/middleware/auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided.');
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
