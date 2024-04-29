import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/orm/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], // , forwardRef(() => AuthModule)
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
