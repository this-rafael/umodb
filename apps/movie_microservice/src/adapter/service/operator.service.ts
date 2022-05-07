import { Injectable } from '@nestjs/common'
import { CreateOperatorModel } from '../../core/models/create-operator.model'
import { CreateOperatorStrategy } from '../../core/strategies/create-operator.strategy.ts'

@Injectable()
export class OperatorService {
  constructor(private readonly createOperator: CreateOperatorStrategy) {}

  async create(operator: CreateOperatorModel): Promise<void> {
    await this.createOperator.call(operator)
  }
}
