import { FastifyAdapter } from '@nestjs/platform-fastify'
import { ServerResponse } from 'http'

export function getCustomizedFastifyAdapter(): FastifyAdapter {
  const fastifyAdapter = new FastifyAdapter()

  fastifyAdapter.getInstance().addHook(
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

  return fastifyAdapter
}
