import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller'; // 导入 AuthController

@Module({
  imports: [JwtModule.register({ secret: 'hard!to-guess_secret' })],
  controllers: [AppController,AuthController],
  providers: [AppService],
})
export class AppModule {}
