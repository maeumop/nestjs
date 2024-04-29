import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'UUID' })
  userUid: string;

  @ApiProperty({ description: '사용자 아이디' })
  userId: string;

  @ApiProperty({ description: '사용자 이름' })
  userName: string;

  @ApiProperty({ description: '사용 여부 (1: 사용, 0: 사용안함)' })
  isActive: boolean;

  @ApiProperty({ description: '등록일' })
  createDate: Date;
}
