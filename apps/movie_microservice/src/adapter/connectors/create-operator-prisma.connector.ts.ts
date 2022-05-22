import { CreateOperatorModel } from '../../core/models/create-operator.model'
import { OperatorModel } from '../../core/models/operator.model'
import { RegisterOperatorProtocol } from '../../core/protocols/register-operator.protocol.ts'
import { Decorators } from '../decorators/inject.decorator'
import { PrismaHandler } from '../../infra/handler/prisma.handler'

@Decorators.Inject()
export class CreateOperatorPrismaConnector implements RegisterOperatorProtocol {
  constructor(private readonly prisma: PrismaHandler) {}

  async call({
    email,
    password,
    name,
  }: CreateOperatorModel): Promise<OperatorModel> {
    const created = await this.prisma.operator.create({
      data: {
        email,
        name,
        password,
      },
      select: {
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return {
      email,
      name,
      createdAt: created.createdAt ?? undefined,
    }
  }
}
