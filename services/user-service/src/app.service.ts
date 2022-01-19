import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    return { status: 'OK', message: 'Running' };
  }
}
