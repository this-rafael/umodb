export abstract class EventSubscriberStrategy {
  abstract subscribe<T>(topic: string): AsyncIterator<T>
}
