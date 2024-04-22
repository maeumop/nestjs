import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    JwtModule.register({
      secret: new ConfigService().get('AUTH_KEY'),
    }),
  ],
})
export class AuthModule {}
