import { Decorators } from '../../adapter/decorators/inject.decorator'
import { CreateOperatorModel } from '../models/create-operator.model'
import { MutationResultPromiseModel } from '../models/mutation-result-promise.model'
import { CalculateMaxWaitingTimeProtocol } from '../protocols/calculate-max-waiting-time.protocol'
import { EventPublisherProtocol } from '../protocols/event-publisher.protocol'
import { CreateOperatorStrategy } from '../strategies/create-operator.strategy'

@Decorators.Inject()
export class CreateOperatorUsecase implements CreateOperatorStrategy {
  constructor(
    private readonly eventPublisher: EventPublisherProtocol,
    private readonly calculateMaxWaitingTime: CalculateMaxWaitingTimeProtocol,
  ) {}

  async create(
    operator: CreateOperatorModel,
    subscriptionId: string,
    topic: string,
  ): Promise<MutationResultPromiseModel> {
    await this.eventPublisher.send({
      subscriptionId,
      data: [operator],
      topic,
    })
    const now = new Date()
    return {
      createdAt: now,
      expectedResultAt: await this.calculateMaxWaitingTime.calculate(now),
    }
  }
}
