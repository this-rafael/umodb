import { Injectable } from '@nestjs/common';

@Injectable()
export class PeopleMicroserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
