import { KafkaPubSub } from 'graphql-kafka-subscriptions'
import { PubSubEngine } from 'graphql-subscriptions'
import { GetPubSubProtocol } from '../../core/protocols/pubsub-connection.protocol'
import { GlobalEnv } from '../../infra/global.env.model'
import { Decorators } from '../decorators/inject.decorator'

@Decorators.Inject()
export class GetKafkaPubSubConnector implements GetPubSubProtocol {
  private cachedPubSub = new Map<string, PubSubEngine>()

  getPubSub(topic: string): PubSubEngine {
    const cachedPubSub = this.cachedPubSub.get(topic)
    if (cachedPubSub) {
      return cachedPubSub
    }
    const newKafkaPubSub = new KafkaPubSub({
      host: GlobalEnv.instance.host,
      port: GlobalEnv.instance.port,
      topic,
    })

    this.cachedPubSub.set(topic, newKafkaPubSub)

    return newKafkaPubSub
  }
}
