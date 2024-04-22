import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormModule } from './orm';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeormModule.forRoot(), UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
