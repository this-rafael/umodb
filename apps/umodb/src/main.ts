import { NestFactory } from '@nestjs/core'
import { getCustomizedFastifyAdapter } from '@app/fastify-adapter-configure'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { GlobalEnv } from './infra/global.env.model'
import { AppModule } from './infra/nestjs/app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    getCustomizedFastifyAdapter(),
  )

  await app.listen(3000)
}

GlobalEnv.build()
bootstrap()
