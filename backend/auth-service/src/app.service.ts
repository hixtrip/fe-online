import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface LoginVo {
  username: string;
  password: string;
}

export interface LoginInfoVo {
  token: string;
  username: string;
  password: string;
}


@Injectable()
export class AppService {
  constructor(private readonly jwt: JwtService) {}

  sign(vo: LoginVo): string {
    return this.jwt.sign(JSON.stringify(vo));
  }
  getInfo(token: string): LoginVo {
    return this.jwt.decode(token);
  }

  signAndInfo(vo: LoginVo):LoginInfoVo{
    let token=this.jwt.sign(JSON.stringify(vo))
    let userInfo=this.jwt.decode(token);
    return {token:token,username:userInfo.username,password:userInfo.password}
  }
}
