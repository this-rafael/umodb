import { NestFactory } from '@nestjs/core';
import { PeopleMicroserviceModule } from './people_microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(PeopleMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
