import { Module } from '@nestjs/common';
import { PeopleMicroserviceController } from './people_microservice.controller';
import { PeopleMicroserviceService } from './people_microservice.service';

@Module({
  imports: [],
  controllers: [PeopleMicroserviceController],
  providers: [PeopleMicroserviceService],
})
export class PeopleMicroserviceModule {}
