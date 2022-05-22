import { expect } from 'chai'
import { faker } from '@faker-js/faker'
import { stub } from 'sinon'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateOperatorUsecase } from '../../src/core/usecases/create-operator.usecase'
import { CreateOperatorStrategy } from '../../src/core/strategies/create-operator.strategy'
import { EventPublisherProtocol } from '../../src/core/protocols/event-publisher.protocol'
import { CalculateMaxWaitingTimeProtocol } from '../../src/core/protocols/calculate-max-waiting-time.protocol'
import { CalculateMaxWaitingTimeConnector } from '../../src/adapter/connectors/calculate-max-waiting-time.connector'
import { Generate } from '../../../../libs/provider-generation-functions/src'

/**
 * Test CreateOperatorUsecase class And CreateOperatorStrategy class
 */
describe('CreateOperatorUsecase', () => {
  let createOperatorStrategy: CreateOperatorStrategy
  let eventPublisher: EventPublisherProtocol

  before(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Generate.provider(CreateOperatorStrategy, CreateOperatorUsecase),
        Generate.mockedProvider<EventPublisherProtocol>(
          EventPublisherProtocol,
          {
            async send({ subscriptionId, data, topic }) {
              return []
            },
          },
        ),
        Generate.provider(
          CalculateMaxWaitingTimeProtocol,
          CalculateMaxWaitingTimeConnector,
        ),
      ],
    }).compile()
    createOperatorStrategy = module.get<CreateOperatorStrategy>(
      CreateOperatorStrategy,
    )
    eventPublisher = module.get<EventPublisherProtocol>(EventPublisherProtocol)
  })

  /**
   * Test if typeof createOperatorUsecase is CreateOperatorUsecase
   */
  it('should be instance of CreateOperatorUsecase', () => {
    expect(createOperatorStrategy).to.be.instanceOf(CreateOperatorUsecase)
  })

  /**
   * Test createOperatorUsecase.create()
   */
  it('should create operator', async () => {
    const { expectedResultAt, createdAt } = await createOperatorStrategy.create(
      {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.name.firstName(),
      },
      'test',
    )

    /** verify if operator is a object with createdAt equals to now and expectResultAt now + 5 seconds */
    expect(expectedResultAt).to.be.instanceOf(Date)
    expect(createdAt).to.be.instanceOf(Date)
    expect(expectedResultAt.getTime()).to.be.equal(createdAt.getTime() + 5000)
  })
})
