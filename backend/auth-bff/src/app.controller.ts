import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { AppService ,LoginVo} from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MATH_SERVICE') private client: ClientProxy
  ) { }

  @Post('authLogin')
  async login(@Body() vo:LoginVo): Promise<LoginVo> {
    const token = await this.client
      .send<string>({cmd:'login'}, vo)
      .toPromise();
    localStorage.setItem("token", token);
    const users = await this.client
    .send<LoginVo>({cmd:'getInfo'}, token)
      .toPromise();

    return users;
  }

}

