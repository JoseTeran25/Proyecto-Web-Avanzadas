import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@WebSocketGateway({ cors: { origin: '*' } })
export class WebsocketsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly httpService: HttpService) {}

  handleConnection(client: any) {
    console.log('🔌 Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('❌ Client disconnected:', client.id);
  }

  @SubscribeMessage('chatMessage')
  async handleMessage(@MessageBody() message: string): Promise<void> {
    console.log('📩 Message received:', message);

    // Redirigir mensaje al microservicio de WebSockets
    try {
      await lastValueFrom(
        this.httpService.post('http://ws-service:4003/chatMessage', { message }),
      );
    } catch (error) {
      console.error('🚨 Error sending message to WebSocket Service:', error);
    }

    this.server.emit('chatMessage', message);
  }
}
