import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UserEntity } from 'src/typeorm';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<string | HttpException> {
    const user = await this.userService.createUser(createUserDto);

    if (user instanceof UserEntity) return 'Ekleme işlemi başarılı.';

    throw new HttpException(
      'Kullanıcı ekleme işlemi başarısız!',
      HttpStatus.BAD_REQUEST,
    );
  }
}
