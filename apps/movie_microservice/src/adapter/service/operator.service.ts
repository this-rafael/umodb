import { Inject, Injectable } from '@nestjs/common'
import { StrategyAnalyzer } from '../../../../../libs/provider-generation-functions/src'
import { CreateOperatorModel } from '../../core/models/create-operator.model'
import { CreateOperatorStrategy } from '../../core/strategies/register-operator.strategy.ts'

@Injectable()
export class OperatorService {
  constructor(
    @Inject('StrategyAnalyzer')
    private readonly strategyAnalizer: StrategyAnalyzer<CreateOperatorStrategy>,
  ) {}

  async create(operator: CreateOperatorModel): Promise<void> {
    await this.strategyAnalizer.analyze('usecase').call(operator)
  }
}
