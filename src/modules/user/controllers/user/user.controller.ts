import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UserEntity } from 'src/typeorm';
import { SerializedUser } from '../../types';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async getAllUser(): Promise<SerializedUser[]> {
    return await this.userService.getAllUser();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<string | HttpException> {
    const user = await this.userService.createUser(createUserDto);

    if (user instanceof UserEntity) return 'Ekleme işlemi başarılı.';
  }

  @Patch('update/:id')
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateUserDto,
  ): Promise<string | HttpException> {
    const updatedUser = await this.userService.updateUser(id, createUserDto);

    if (updatedUser instanceof UserEntity) return 'Güncelleme işlemi başarılı.';
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }

  @Delete('delete/:id')
  async userDelete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string | HttpException> {
    const result = await this.userService.deleteUser(id);

    if (result) return 'Silme işlemi başarılı.';
  }
}
