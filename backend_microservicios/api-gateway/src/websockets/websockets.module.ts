import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websockets.gateway';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [WebsocketsGateway],
})
export class WebsocketsModule {}
