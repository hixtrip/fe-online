import { Body, Controller, Post } from '@nestjs/common';
import { AppService, LoginVo } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @MessagePattern({cmd:'login'})
  login(vo: LoginVo): string {
    return this.appService.sign(vo);
  }
  @MessagePattern({cmd:'getInfo'})
  getInfo(token: string): LoginVo {   
    console.log('getInfo token:',token);
    const info =this.appService.getInfo(token);
    console.log('info:',JSON.stringify(info));
    return info;
  }

  // @Post('/login')
  // login(@Body() vo: LoginVo): string {
  //   return this.appService.sign(vo);
  // }

  // @Post('/info')
  // getInfo(@Body() token: string): LoginVo {
  //   return this.appService.getInfo(token);
  // }
}
