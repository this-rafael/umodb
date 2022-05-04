import { Injectable } from '@nestjs/common'
import { CreateOperatorStrategy } from '../../core/strategies/create-operator.strategy'
import { CreateOperatorInputType } from '../../infra/graphql/dtos/create-operator.input-type'
import { OperatorObjectType } from '../../infra/graphql/dtos/operator.object-type'

@Injectable()
export class OperatorService {
  constructor(private readonly createOperator: CreateOperatorStrategy) {}

  async registerOperator(
    operator: CreateOperatorInputType,
  ): Promise<OperatorObjectType> {
    return new OperatorObjectType({
      externalId: '123',
      name: '',
      password: '',
      email: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}
