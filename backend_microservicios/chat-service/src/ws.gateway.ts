import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class WsGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    console.log(`🔌 Client connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`❌ Client disconnected: ${socket.id}`);
  }

  @SubscribeMessage('chatMessage')
  handleMessage(@MessageBody() message: string, @ConnectedSocket() socket: Socket): void {
    console.log(`📩 Message from ${socket.id}: ${message}`);

    // Enviar a todos los clientes
    this.server.emit('chatMessage', message);
  }
}
