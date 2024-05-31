import { Injectable } from '@nestjs/common';
import { AppService, LoginVo } from '../app.service';

@Injectable()
export class AuthService {
  constructor(private readonly appService: AppService) {}

  login(vo: LoginVo): { token: string; userInfo: LoginVo } {
    const token = this.appService.sign(vo);
    const userInfo = this.appService.getInfo(token);
    return { token, userInfo };
  }
}
