import { PubSub } from 'graphql-subscriptions'

export abstract class GetPubSubProtocol {
  abstract getPubSub(): PubSub
}
