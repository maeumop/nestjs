import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/orm/entity/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
