import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // 🔹 Importar HttpModule
import { WsGateway } from './ws.gateway';

@Module({
  imports: [HttpModule], // 🔹 Agregar HttpModule aquí
  providers: [WsGateway],
})
export class WsModule {}
