import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { MovieMicroserviceModule } from './infra/nestjs/movie_microservice.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(MovieMicroserviceModule)
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      consumer: {
        groupId: `movie-consomer${Math.random()}`,
      },
      client: {
        clientId: 'movie',
        brokers: ['localhost:9094'],
      },
    },
  })

  await app.startAllMicroservices()
  await app.listen(23000)
}
bootstrap()
