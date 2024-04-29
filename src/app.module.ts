import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoListEntity } from './orm/entity/todo.entity';
import { UserEntity } from './orm/entity/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

const config = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.get('HOST'),
      port: config.get('PORT'),
      username: config.get('USERNAME'),
      password: config.get('PASSWORD'),
      database: config.get('DATABASE'),
      entities: [ToDoListEntity, UserEntity],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
