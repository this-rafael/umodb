import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { ServerResponse } from 'node:http'
import { PrismaConnector } from './adapter/connector/prisma.connector'
import { AppModule } from './infra/nestjs/app.module'

export const configureFastify = (fastifyAdapter: FastifyAdapter): void => {
  const fastifyInstanceNew = fastifyAdapter.getInstance()
  fastifyInstanceNew.addHook(
    'onRequest',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_: unknown, reply: any, done: any) => {
      const newReply = {
        setHeader(
          name: string,
          value: number | string | ReadonlyArray<string>,
        ): ServerResponse {
          return this.raw.setHeader(name, value)
        },

        end(): void {
          this.raw.end()
        },
        ...reply,
      }

      Object.assign(reply, newReply)
      done()
    },
  )
}

async function bootstrap(): Promise<void> {
  const fastifyAdapter = new FastifyAdapter()
  configureFastify(fastifyAdapter)
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  )

  await app.listen(3000)
}
bootstrap()
