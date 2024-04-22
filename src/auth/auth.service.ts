import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/orm/entity/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  async rotateAccessToken(token: string): Promise<string> {
    const decode = this.jwtService.verify(token);

    return this.signToken(
      {
        userName: decode.userName,
        userId: decode.userId,
      },
      false,
    );
  }

  signToken(user: SignTokenParam, isRefresh: boolean): string {
    const payload = {
      userName: user.userName,
      userId: user.userId,
      type: isRefresh ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      expiresIn: isRefresh ? '1d' : '5m',
    });
  }

  async authenticate(userName: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne(userName, password);

    if (user === null) {
      return null;
    }

    return user;
  }

  async login(user: User): Promise<LoginToken> {
    return {
      refreshToken: this.signToken(user, true),
      accessToken: this.signToken(user, false),
    };
  }
}
