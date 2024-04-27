import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';

@Injectable()
export class UserService {
  createUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
