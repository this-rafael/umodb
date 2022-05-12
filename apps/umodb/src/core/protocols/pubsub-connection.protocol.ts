import { PubSubEngine } from 'graphql-subscriptions'

/**
 * @description GetPubSubProtocol is a protocol for getting PubSubEngine instance for a determined topic
 */
export abstract class GetPubSubProtocol {
  abstract getPubSub(topic: string): PubSubEngine
}
