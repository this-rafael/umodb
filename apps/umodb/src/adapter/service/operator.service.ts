import { CreateOperatorStrategy } from '../../core/strategies/create-operator.strategy'
import { SubscriptionUniqueIDStrategy } from '../../core/strategies/produce-subscription-unique-id.strategy.ts'
import { CreateOperatorInputType } from '../../infra/graphql/dtos/create-operator.input-type'
import { MutationResultPromiseObjectType } from '../../infra/graphql/dtos/mutation-result-promise.object-type'
import { Decorators } from '../decorators/inject.decorator'

@Decorators.Inject()
export class OperatorService {
  constructor(
    private readonly createOperator: CreateOperatorStrategy,
    private readonly subscriptionUniqueId: SubscriptionUniqueIDStrategy,
  ) {}

  async registerOperator(
    operator: CreateOperatorInputType,
    subscriptionId: string,
  ): Promise<MutationResultPromiseObjectType> {
    const createdOperator = await this.createOperator.create(
      operator,
      subscriptionId,
    )

    return new MutationResultPromiseObjectType(createdOperator)
  }

  async getSubscriptionUniqueId(): Promise<string> {
    const id = await this.subscriptionUniqueId.produce()
    return id
  }
}
