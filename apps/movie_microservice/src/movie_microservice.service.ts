import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieMicroserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
