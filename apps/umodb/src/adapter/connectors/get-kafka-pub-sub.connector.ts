import { PubSub } from 'graphql-subscriptions'
import { GetPubSubProtocol } from '../../core/protocols/pubsub-connection.protocol'

export class GetKafkaPubSubConnector implements GetPubSubProtocol {
  getPubSub(): PubSub {
    throw new Error('Method not implemented.')
  }
}
