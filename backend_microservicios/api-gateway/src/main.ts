// api-gateway/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

  // Configurar WebSockets
  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(4000, '0.0.0.0'); // 🔹 Escucha en todas las interfaces de red
  console.log('🚀 API Gateway running on http://localhost:4000');
}
bootstrap();
