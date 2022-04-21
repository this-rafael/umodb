import { NestFactory } from '@nestjs/core';
import { MovieMicroserviceModule } from './movie_microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(MovieMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
