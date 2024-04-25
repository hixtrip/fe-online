import { Body, Controller, Post } from '@nestjs/common';
import { AppService, LoginVo } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  login(@Body() vo: LoginVo): string {
    return this.appService.sign(vo);
  }

  @Post('/info')
  getInfo(@Body() body: { token: string }): LoginVo {
    return this.appService.getInfo(body.token);
  }
}
