import { Inject } from '@nestjs/common'
import { Producer } from '@nestjs/microservices/external/kafka.interface'
import { EventPublisherProtocol } from '../../core/protocols/event-publisher.protocol'
import { Decorators } from '../decorators/inject.decorator'

@Decorators.Inject()
export class KafkaPublisherConnector implements EventPublisherProtocol {
  constructor(
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer,
  ) {}

  send<T>({
    data,
    topic,
    subscriptionId,
  }: {
    data: T[]
    topic: string
    subscriptionId: string
  }): Promise<
    {
      topicName: string
      partition: number
      errorCode: number
      offset?: string
      timestamp?: string
      baseOffset?: string
      logAppendTime?: string
      logStartOffset?: string
    }[]
  > {
    return this.kafkaProducer.send({
      topic,
      messages: data.map(data => ({
        key: topic,
        value: JSON.stringify({
          subscriptionId,
          ...data,
        }),
      })),
    })
  }
}
