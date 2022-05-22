import { expect } from 'chai'

import { Test, TestingModule } from '@nestjs/testing'
import { stub } from 'sinon'
import { faker } from '@faker-js/faker'
import { Producer } from '@nestjs/microservices/external/kafka.interface'
import { Generate } from '../../../../libs/provider-generation-functions/src'
import { EventPublisherProtocol } from '../../src/core/protocols/event-publisher.protocol'
import { KafkaPublisherConnector } from '../../src/adapter/connectors/kafka-publisher.connector'

/**
 * Test KafkaEventPublisher class and EventPublisherProtocol class
 */
describe('EventPublisherProtocol', () => {
  let eventPublisherProtocol: EventPublisherProtocol
  let kafkaProduce: Producer

  const mockedKafkaProducerResult = {
    topicName: faker.random.word(),
    partition: faker.datatype.number(),
    errorCode: faker.datatype.number(),
    offset: faker.random.word(),
    timestamp: faker.random.word(),
    baseOffset: faker.random.word(),
    logAppendTime: faker.random.word(),
    logStartOffset: faker.random.word(),
  }

  before(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Generate.provider(EventPublisherProtocol, KafkaPublisherConnector),
        {
          provide: 'KAFKA_PRODUCER',
          useValue: {
            async send(): Promise<unknown[]> {
              return [mockedKafkaProducerResult]
            },
          },
        },
      ],
    }).compile()
    eventPublisherProtocol = module.get<EventPublisherProtocol>(
      EventPublisherProtocol,
    )
    kafkaProduce = module.get('KAFKA_PRODUCER')
  })

  /**
   * Test if typeof eventPublisherProtocol is EventPublisherProtocol
   */
  it('should be instance of EventPublisherProtocol', () => {
    expect(eventPublisherProtocol).to.be.instanceOf(KafkaPublisherConnector)
  })

  /**
   * Test eventPublisherProtocol.send() is equals to 'KAFKA_PRODUCER'.send()
   */
  it('should send event', async () => {
    const result = await eventPublisherProtocol.send<string>({
      subscriptionId: 'subscriptionId',
      data: ['hello', 'world'],
      topic: 'topic',
    })

    expect(result).to.be.deep.equal([mockedKafkaProducerResult])
  })

  /**
   * Test eventPublisherProtocol.send() throws Error when 'KAFKA_PRODUCER' throws Error with message PublishEventError
   */
  it('should send event with Error with message PublishEventError', async () => {
    stub(kafkaProduce, 'send').resolves([
      {
        errorCode: 1,
        partition: faker.datatype.float(),
        offset: faker.random.words(),
        timestamp: new Date().toDateString(),
        topicName: faker.random.word(),
        baseOffset: faker.random.word(),
      },
    ])

    try {
      await eventPublisherProtocol.send<string>({
        subscriptionId: 'subscriptionId',
        data: ['hello', 'world'],
        topic: 'topic',
      })
    } catch (e) {
      expect(e.message).to.be.equal('PublishEventError')
    }
  })
})
