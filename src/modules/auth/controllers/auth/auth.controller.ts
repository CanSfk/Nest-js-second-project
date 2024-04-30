import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Session,
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

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }
}
