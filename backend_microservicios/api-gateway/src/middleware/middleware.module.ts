// api-gateway/src/middleware/middleware.module.ts
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';

@Module({})
export class MiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
