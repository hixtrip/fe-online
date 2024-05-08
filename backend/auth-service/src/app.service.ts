import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface LoginVo {
  username: string;
  password: string;
}

export type tokenUser = {
  token: string;
} & LoginVo

@Injectable()
export class AppService {
  constructor(private readonly jwt: JwtService) {}

  sign(vo: LoginVo): string {
    return this.jwt.sign(JSON.stringify(vo));
  }
  getInfo(token: string): LoginVo {
    return this.jwt.decode(token);
  }
}
