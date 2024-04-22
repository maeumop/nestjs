import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

class Sha512 implements ValueTransformer {
  to(value: string): string {
    if (value) {
      return crypto.createHash('sha512').update(value).digest('hex');
    }

    return value;
  }

  from(value: string): string {
    return value;
  }
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userUid: string = uuidv4();

  @Column()
  userId: string;

  @Column()
  userName: string;

  @Column({ transformer: new Sha512() })
  pwd: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;
}
