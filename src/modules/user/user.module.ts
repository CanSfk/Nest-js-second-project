import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';

@Module({
  controllers: [UserController],
  providers: [{ provide: 'USER_SERVICE', useClass: UserService }],
})
export class UserModule {}
