import { Decorators } from '../../adapter/decorators/inject.decorator'
import { GetPubSubProtocol } from '../protocols/pubsub-connection.protocol'
import { EventSubscriberStrategy } from '../strategies/event-subscriber.strategy'

@Decorators.Inject()
export class EventSubscriberUsecase implements EventSubscriberStrategy {
  constructor(private readonly pubSubConnection: GetPubSubProtocol) {}

  subscribe<T>(topic: string): AsyncIterator<T> {
    const pubsub = this.pubSubConnection.getPubSub(topic)

    const subscription = pubsub.asyncIterator<T>(topic)

    return subscription
  }
}
