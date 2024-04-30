import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { SignInDto } from '../../dtos/SignIn.dto';
import { UserEntity } from 'src/typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<UserEntity | UnauthorizedException> {
    return await this.authService.signIn(
      signInDto.userName,
      signInDto.password,
    );
  }
}
