import { Test, TestingModule } from '@nestjs/testing';
import { MovieMicroserviceController } from './movie_microservice.controller';
import { MovieMicroserviceService } from './movie_microservice.service';

describe('MovieMicroserviceController', () => {
  let movieMicroserviceController: MovieMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MovieMicroserviceController],
      providers: [MovieMicroserviceService],
    }).compile();

    movieMicroserviceController = app.get<MovieMicroserviceController>(MovieMicroserviceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(movieMicroserviceController.getHello()).toBe('Hello World!');
    });
  });
});
