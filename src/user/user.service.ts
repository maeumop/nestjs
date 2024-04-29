import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/orm/entity/user.entity';
import { Repository } from 'typeorm';
import { User } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(userId: string, pwd: string): Promise<User | null> {
    return this.userRepository.findOneBy({ userId, pwd });
  }

  findByUserId(userId: string): Promise<User | null> {
    return this.userRepository.findOneBy({ userId });
  }

  async remove(userUid: string): Promise<void> {
    await this.userRepository.delete(userUid);
  }
}
