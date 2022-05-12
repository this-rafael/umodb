import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { getCustomizedFastifyAdapter } from '@app/fastify-adapter-configure'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { MovieMicroserviceModule } from './infra/nestjs/movie_microservice.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    MovieMicroserviceModule,
    getCustomizedFastifyAdapter(),
  )
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      consumer: {
        groupId: `movie-consomer-${Math.random()}`,
      },
      client: {
        brokers: ['localhost:9094'],
      },
    },
  })

  await app.startAllMicroservices()
  await app.listen(23000)
}
bootstrap()
