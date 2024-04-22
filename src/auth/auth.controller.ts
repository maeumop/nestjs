import { Controller, Request, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { ApiBasicTokenHeader, ApiBearerTokenHeader } from './token.header';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '사용자 로그인',
  })
  @ApiBasicTokenHeader()
  @ApiOkResponse({
    description: 'Access, Refresh Token 발급',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
          description: 'Access Token',
        },
        refreshToken: {
          type: 'string',
          description: 'Refresh Token',
        },
      },
    },
  })
  @Post('login')
  async login(@Request() { user }): Promise<LoginToken> {
    return this.authService.login(user);
  }

  @ApiOperation({
    summary: 'Token refresh',
  })
  @ApiBearerTokenHeader()
  @ApiOkResponse({
    description: 'Access token',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
          description: 'Access token 발급',
        },
      },
    },
  })
  @Post('token')
  async token(@Request() { token }) {
    return {
      accessToken: await this.authService.rotateAccessToken(token),
    };
  }
}
