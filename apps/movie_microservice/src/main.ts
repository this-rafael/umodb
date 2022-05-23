import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { getCustomizedFastifyAdapter } from '@app/fastify-adapter-configure'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { MovieMicroserviceModule } from './infra/nestjs/movie_microservice.module'
import {
  EnvironmentModel,
  handleEnvhronment,
} from '../../../libs/shared-env/src'
import { PrismaHandler } from './infra/handler/prisma.handler'

async function setupPrismaConnection(
  app: NestFastifyApplication,
): Promise<void> {
  // const prismaService: PrismaHandler = app.get(PrismaHandler)
  // await prismaService.enableShutdownHooks(app)
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    MovieMicroserviceModule,
    getCustomizedFastifyAdapter(),
  )
  // await setupPrismaConnection(app)
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

handleEnvhronment()
bootstrap()
