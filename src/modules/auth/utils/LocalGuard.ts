import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    // ?? Bu method yerel kimlik doğrulama stratejisini kullanarak kimlik doğrulamasını gerçekleştiriyor.
    const result = (await super.canActivate(context)) as boolean;

    // ?? context nesnesinden HTTP isteği request objesine atanıyor.
    const request = context.switchToHttp().getRequest();

    // ?? reqeust true ise kullanıcı sisteme giriş yapılıyor.
    await super.logIn(request);

    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    return req.isAuthenticated();
  }
}
