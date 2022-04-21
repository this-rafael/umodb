import { Module } from '@nestjs/common';
import { MovieMicroserviceController } from './movie_microservice.controller';
import { MovieMicroserviceService } from './movie_microservice.service';

@Module({
  imports: [],
  controllers: [MovieMicroserviceController],
  providers: [MovieMicroserviceService],
})
export class MovieMicroserviceModule {}
