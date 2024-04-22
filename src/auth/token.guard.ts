import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const raw = request.headers('authorization');

    const [type, token] = raw.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('잘못된 토큰형식입니다(1).');
    }

    let payload;

    try {
      payload = this.authService.verifyToken(token);
    } catch (e) {
      throw new UnauthorizedException('잘못된 토큰형식입니다(2).');
    }

    if (!payload.userId) {
      throw new UnauthorizedException('잘못된 토큰형식입니다(3).');
    }

    request.user = await this.userService.findByUserId(payload.userId);
    request.tokne = token;
    request.tokenType = payload.type;

    return true;
  }
}

@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (req.tokenType !== 'access') {
      throw new UnauthorizedException('Access Token이 아닙니다');
    }

    return true;
  }
}

@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (req.tokenType !== 'refresh') {
      throw new UnauthorizedException('Refresh Token이 아닙니다.');
    }

    return true;
  }
}
