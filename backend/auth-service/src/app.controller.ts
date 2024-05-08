import { Body, Controller, Post } from '@nestjs/common';
import { AppService, LoginVo, tokenUser } from './app.service';

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

  @Post('/loginGetInfo')
  async loginGetInfo(@Body() vo: LoginVo): Promise<tokenUser> {
    const token = await this.login(vo);
    const { username, password } = await this.getInfo(token);
    return { token, username, password };
  }
}
