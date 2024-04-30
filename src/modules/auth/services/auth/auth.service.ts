import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user/user.service';
import { SerializedUser } from 'src/modules/user/types';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {}

  async signIn(userName: string, password: string): Promise<SerializedUser> {
    const user = await this.userService.findUserValidate(userName);

    if (user && user?.password === password) return new SerializedUser(user);

    throw new UnauthorizedException();
  }
}
