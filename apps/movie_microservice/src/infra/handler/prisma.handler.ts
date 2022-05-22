import { OnModuleInit, INestApplication } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { OrmProtocol } from '../../core/protocols/orm.protocol'

/**
 * @description
 * PrismaHandler is responsible to handle the PrismaClient instance.
 * It is responsible to create the PrismaClient instance and to provide it to the application.
 * It is also responsible to close the PrismaClient instance when the application is closed.
 * It is also responsible to provide the PrismaClient instance to the application.
 * This class shouldn't be used directly by core layer members.
 * This class only be used by the adapter layer and infra layer.
 */
export class PrismaHandler
  extends PrismaClient
  implements OrmProtocol, OnModuleInit
{
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async () => {
      app.close()
    })
  }
}
