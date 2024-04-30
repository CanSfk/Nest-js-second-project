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
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { SignInDto } from '../../dtos/SignIn.dto';
import { SerializedUser } from 'src/modules/user/types';
import { AuthenticatedGuard, LocalAuthGuard } from '../../utils/LocalGuard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
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

  @UseGuards(AuthenticatedGuard)
  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }
}
