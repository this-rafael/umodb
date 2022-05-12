import { CreateOperatorModel } from '../../core/models/create-operator.model'
import { OperatorModel } from '../../core/models/operator.model'
import { CreateOperatorProtocol } from '../../core/protocols/create-operator.protocol.ts'
import { Decorators } from '../decorators/inject.decorator'
import { PrismaConnector } from './prisma.connector'

@Decorators.Inject()
export class CreateOperatorConnector implements CreateOperatorProtocol {
  constructor(private readonly prisma: PrismaConnector) {}

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
