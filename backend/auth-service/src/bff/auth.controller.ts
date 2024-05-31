import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginVo } from '../app.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() vo: LoginVo): { token: string; userInfo: LoginVo } {
    return this.authService.login(vo);
  }
}
