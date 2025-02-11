import { NestFactory } from '@nestjs/core';
import { WsModule } from './ws.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(WsModule);

  // Adaptador para WebSockets
  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(4003); // Puerto del microservicio WebSocket
  console.log('🚀 WebSocket Service running on ws://localhost:4003');
}
bootstrap();
