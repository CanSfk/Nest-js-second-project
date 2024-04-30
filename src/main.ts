import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  app.use(
    session({
      // ?? name: Oturum adı
      name: 'NESTJS_SESSION_ID',

      // ?? secret: Gizli anahtar. Oturum bilgilerini korumak için kullanılır.
      secret: 'asdf23r4ad234hapfhDFASDFfadf9asdfAFfADSF',

      // ?? Her istekte oturumun yenilenip yenilenmiyeceğini ayarlar.
      resave: false,

      // ?? Kullanıcı otorum açmadan sitede gezinmeye izin vermek için. Örnek oturum açmadan sepete ürün eklemek ve kaydetmek.
      saveUninitialized: true,

      // ?? Çerez ayarları
      cookie: {
        maxAge: 6000,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
