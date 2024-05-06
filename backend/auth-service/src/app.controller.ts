import { Body, Controller, Post } from '@nestjs/common';
import {AppService, LoginInfoVo, LoginVo} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  login(@Body() vo: LoginVo): string {
    return this.appService.sign(vo);
  }

  @Post('/info')
  getInfo(@Body() token: string): LoginVo {
    return this.appService.getInfo(token);
  }

  @Post('/loginUserInfo')
  loginUserInfo(@Body() vo: LoginVo): LoginInfoVo {
    return this.appService.signAndInfo(vo);
  }
}
