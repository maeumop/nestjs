import { Controller, Request, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/orm/entity/user';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/all')
  @ApiOperation({
    summary: '전체 사용자 정보를 가져 옵니다.',
  })
  @ApiOkResponse({
    description: '사용자 전체 목록 가져오기 성공',
    type: User,
  })
  async getAllUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('user')
  @ApiOperation({
    summary: '사용자 정보를 가져 옵니다.',
  })
  @ApiOkResponse({
    description: '사용자의 아이디와 비밀번호로 사용자 정보를 인증합니다.',
    type: User,
  })
  async getUser(@Request() req): Promise<User> {
    return this.userService.findByUserId(req.user.userId);
  }
}
