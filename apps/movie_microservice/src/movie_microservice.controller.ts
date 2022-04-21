import { Controller, Get } from '@nestjs/common';
import { MovieMicroserviceService } from './movie_microservice.service';

@Controller()
export class MovieMicroserviceController {
  constructor(private readonly movieMicroserviceService: MovieMicroserviceService) {}

  @Get()
  getHello(): string {
    return this.movieMicroserviceService.getHello();
  }
}
