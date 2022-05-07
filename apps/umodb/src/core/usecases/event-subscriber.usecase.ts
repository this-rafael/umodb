import { EventSubscriberStrategy } from '../strategies/event-subscriber.strategy'

export class EventSubscriberUsecase implements EventSubscriberStrategy {
  constructor(private readonly pubSubConnection: PubSubConnectionProtocol) {}

  subscribe<T>(topic: string): AsyncIterableIterator<T> {
    return this.pubSubConnection
  }
}
