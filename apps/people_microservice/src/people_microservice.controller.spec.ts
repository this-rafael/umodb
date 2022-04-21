import { Test, TestingModule } from '@nestjs/testing';
import { PeopleMicroserviceController } from './people_microservice.controller';
import { PeopleMicroserviceService } from './people_microservice.service';

describe('PeopleMicroserviceController', () => {
  let peopleMicroserviceController: PeopleMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PeopleMicroserviceController],
      providers: [PeopleMicroserviceService],
    }).compile();

    peopleMicroserviceController = app.get<PeopleMicroserviceController>(PeopleMicroserviceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(peopleMicroserviceController.getHello()).toBe('Hello World!');
    });
  });
});
