import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UnauthorizedException,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { SignInDto } from '../../dtos/SignIn.dto';
import { SerializedUser } from 'src/modules/user/types';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<SerializedUser | UnauthorizedException> {
    return await this.authService.signIn(
      signInDto.userName,
      signInDto.password,
    );
  }
}
