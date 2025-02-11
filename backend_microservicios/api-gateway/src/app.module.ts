// api-gateway/src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthGatewayModule } from './auth/auth.module';
import { GradesGatewayModule } from './grades/grades.module';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    AuthGatewayModule,  // Proxy a auth-service
    GradesGatewayModule,
    WebsocketsModule,    // Módulo de WebSockets
  ],
})
export class AppModule { }
