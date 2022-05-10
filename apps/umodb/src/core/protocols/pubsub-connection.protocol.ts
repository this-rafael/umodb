import { PubSubEngine } from 'graphql-subscriptions'

export abstract class GetPubSubProtocol {
  abstract getPubSub(topic: string): PubSubEngine
}
