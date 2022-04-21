import { Controller, Get } from '@nestjs/common';
import { PeopleMicroserviceService } from './people_microservice.service';

@Controller()
export class PeopleMicroserviceController {
  constructor(private readonly peopleMicroserviceService: PeopleMicroserviceService) {}

  @Get()
  getHello(): string {
    return this.peopleMicroserviceService.getHello();
  }
}
