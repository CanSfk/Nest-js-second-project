import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user/user.service';
import { SerializedUser } from 'src/modules/user/types';
import { comparePasswords } from 'src/utils/Bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {}

  async signIn(userName: string, password: string): Promise<SerializedUser> {
    console.log('Inside validate user auth.service');

    const user = await this.userService.findUserValidate(userName);

    if (user) {
      const matched = comparePasswords(password, user.password);

      if (matched) return new SerializedUser(user);

      throw new UnauthorizedException('Hatalı şifre');
    }

    throw new UnauthorizedException();
  }
}
