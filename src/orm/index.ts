import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoListEntity } from './entity/todo.entity';
import { UserEntity } from './entity/user.entity';

@Module({})
export class TypeormModule {
  static forRoot(): DynamicModule {
    const typeormModule: DynamicModule = TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('HOST'),
        port: config.get<number>('PORT'),
        username: config.get<string>('USERNAME'),
        password: config.get<string>('PASSWORD'),
        database: config.get<string>('DATABASE'),
        entities: [ToDoListEntity, UserEntity],
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
