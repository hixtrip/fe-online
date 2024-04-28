import { Injectable } from '@nestjs/common';
export interface LoginVo {
  username: string;
  password: string;
}
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
