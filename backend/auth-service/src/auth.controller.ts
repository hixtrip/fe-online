import { Body, Controller, Post } from '@nestjs/common';
import { AppService, LoginVo } from './app.service';

//统一接口获取用户token和信息
@Controller('/auth')
export class AuthController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  async login(@Body() vo: LoginVo): Promise<{ token: string; userInfo: LoginVo }> {
    // 进行登录逻辑处理
    const token =  this.appService.sign(vo);
    const userInfo =  this.appService.getInfo(token);
    return { token, userInfo };
  }
}
