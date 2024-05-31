import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './bff/auth.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './bff/auth.service';
@Module({
  imports: [JwtModule.register({ secret: 'hard!to-guess_secret' })],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
