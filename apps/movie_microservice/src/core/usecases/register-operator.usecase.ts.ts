/* eslint-disable max-classes-per-file */
import { KafkaTopic } from '../../../../../libs/kafka-topics/src/kafka-topics.enum'
import { Decorators } from '../../adapter/decorators/inject.decorator'
import { CreateOperatorModel } from '../models/create-operator.model'
import { OperatorModel } from '../models/operator.model'
import { RegisterOperatorProtocol } from '../protocols/register-operator.protocol.ts'
import { EventPublisherProtocol } from '../protocols/event-publisher.protocol'
import { CreateOperatorStrategy } from '../strategies/register-operator.strategy.ts'

@Decorators.Inject()
export class CreateOperatorUsecase implements CreateOperatorStrategy {
  constructor(
    private readonly createOperatorProtocol: RegisterOperatorProtocol,
    private readonly eventPublisher: EventPublisherProtocol,
  ) {}

  async call(operator: CreateOperatorModel): Promise<void> {
    const { name, email, createdAt }: OperatorModel =
      await this.createOperatorProtocol.call(operator)

    await this.eventPublisher.send({
      data: [
        {
          data: { name, email, createdAt: new Date() },
        },
      ],
      topic: KafkaTopic.COMMIT_CREATE_OPERATOR,
      subscriptionId: operator.subscriptionId,
    })
  }
}
