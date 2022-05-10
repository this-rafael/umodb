import { Injectable } from '@nestjs/common'
import { KafkaPubSub } from 'graphql-kafka-subscriptions'
import { KafkaTopic } from '@app/kafka-topics/kafka-topics.enum'
import { GlobalEnv } from '../global.env.model'

@Injectable()
export class KafkaPubSubProvider {
  public readonly commitCreateOperator = new KafkaPubSub({
    host: GlobalEnv.instance.host,
    port: GlobalEnv.instance.port,
    topic: KafkaTopic.COMMIT_CREATE_OPERATOR,
  })
}
