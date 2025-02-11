// api-gateway/src/grades/grades.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GradesController } from './grades.controller';

@Module({
  imports: [HttpModule],
  controllers: [GradesController],
})
export class GradesGatewayModule {}
