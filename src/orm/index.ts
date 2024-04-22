import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoList } from './entity/todo';
import { User } from './entity/user';

@Module({})
export class TypeormModule {
  static forRoot(): DynamicModule {
    const typeormModule: DynamicModule = TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('HOST'),
        port: config.get('PORT'),
        username: config.get('USERNAME'),
        password: config.get('PASSWORD'),
        database: config.get('DATABASE'),
        entities: [ToDoList, User],
        synchronize: true,
      }),
      inject: [ConfigService],
    });

    return {
      module: TypeOrmModule,
      imports: [typeormModule],
      exports: [typeormModule],
    };
  }
}
