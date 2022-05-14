import { KafkaTopic } from '../../../../../libs/kafka-topics/src/kafka-topics.enum'
import { Decorators } from '../../adapter/decorators/inject.decorator'
import { CreateMovieModel } from '../models/create-movie.model'
import { MutationResultPromiseModel } from '../models/mutation-result-promise.model'
import { CalculateMaxWaitingTimeProtocol } from '../protocols/calculate-max-waiting-time.protocol'
import { EventPublisherProtocol } from '../protocols/event-publisher.protocol'
import { CreateMovieStrategy } from '../strategies/create-movie.strategy'

@Decorators.Inject()
export class CreateMovieUsecase implements CreateMovieStrategy {
  constructor(
    private readonly eventPublisherProtocolProtocol: EventPublisherProtocol,
    private readonly calculateMaxWaitingTimeProtocolProtocol: CalculateMaxWaitingTimeProtocol,
  ) {}

  async create(
    movie: CreateMovieModel,
    subscriptionId: string,
  ): Promise<MutationResultPromiseModel> {
    await this.eventPublisherProtocolProtocol.send({
      subscriptionId,
      data: [movie],
      topic: KafkaTopic.CREATE_MOVIE,
    })

    const now = new Date()
    return {
      createdAt: now,
      expectedResultAt:
        await this.calculateMaxWaitingTimeProtocolProtocol.calculate(now),
    }
  }
}
