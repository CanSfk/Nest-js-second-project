import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/modules/user/services/user/user.service';
import { UserEntity } from 'src/typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {
    super();
  }

  // ?? Başarıl bir kimlik doğrulaması sonrasında kullanıcı bilgilerin oturuma kaydetmek için kullanılır.
  serializeUser(user: UserEntity, done: (err, user: UserEntity) => void) {
    console.log('Serialize User');
    done(null, user);
  }

  // ?? Bir sonrakı istekte oturum bilgilerinden kullanıcıyı tekrar oluşturmak için kullanılır.
  async deserializeUser(
    user: UserEntity,
    done: (err, user: UserEntity) => void,
  ) {
    console.log('Deserialize User');
    const userDb = await this.userService.getUserById(user.id);

    return userDb ? done(null, userDb) : done(null, null);
  }
}
