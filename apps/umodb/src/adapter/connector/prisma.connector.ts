import { OnModuleInit, INestApplication } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

export class PrismaConnector extends PrismaClient implements OnModuleInit {
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
