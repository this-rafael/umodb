import { expect } from 'chai'

import { Test, TestingModule } from '@nestjs/testing'

import { faker } from '@faker-js/faker'
import { getProvider } from '../../../../libs/provider-generation-functions/src'
import { EventPublisherProtocol } from '../../src/core/protocols/event-publisher.protocol'
import { KafkaPublisherConnector } from '../../src/adapter/connectors/kafka-publisher.connector'

/**
 * Test KafkaEventPublisher class and EventPublisherProtocol class
 */
describe('EventPublisherProtocol', () => {
  let eventPublisherProtocol: EventPublisherProtocol
  const mockedKafkaProducerResult = {
    topicName: faker.random.word(),
    partition: faker.random.number(),
    errorCode: faker.random.number(),
    offset: faker.random.word(),
    timestamp: faker.random.word(),
    baseOffset: faker.random.word(),
    logAppendTime: faker.random.word(),
    logStartOffset: faker.random.word(),
  }

  before(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        getProvider(EventPublisherProtocol, KafkaPublisherConnector),
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
})
