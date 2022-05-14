import { expect } from 'chai'
import { faker } from '@faker-js/faker'
import { stub } from 'sinon'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateMovieUsecase } from '../../src/core/usecases/create-movie.usecase'
import { CreateMovieStrategy } from '../../src/core/strategies/create-movie.strategy'
import {
  getProvider,
  getMockedProvider,
} from '../../../../libs/provider-generation-functions/src'
import { CalculateMaxWaitingTimeConnector } from '../../src/adapter/connectors/calculate-max-waiting-time.connector'
import { CalculateMaxWaitingTimeProtocol } from '../../src/core/protocols/calculate-max-waiting-time.protocol'
import { EventPublisherProtocol } from '../../src/core/protocols/event-publisher.protocol'

/**
 * Testing create movie usecase
 * When a create movie usecase is called, it should be return an Object with properties: createdAt and expectedResultAt
 *    expectedResultAt: the expected result of the create movie usecase is equals to the createdAt + 5 seconds
 *    createdAt: the createdAt of the create movie usecase is equals to the current time
 * When EventPublisherProtocol returns and array with errorCode equals to 1, the create movie usecase returns an Error with message PublishEventError
 */
describe('CreateMovieUsecase Test', () => {
  let createMovieStrategy: CreateMovieStrategy

  /**
   * Setup before all test
   */
  before(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        getProvider(CreateMovieStrategy, CreateMovieUsecase),
        getMockedProvider<EventPublisherProtocol>(EventPublisherProtocol, {
          async send({ subscriptionId, data, topic }) {
            return []
          },
        }),
        getProvider(
          CalculateMaxWaitingTimeProtocol,
          CalculateMaxWaitingTimeConnector,
        ),
      ],
    }).compile()

    createMovieStrategy = module.get<CreateMovieStrategy>(CreateMovieStrategy)
  })

  it('The instance of createMovieStrategy is CreateMovieUsecase', () => {
    expect(createMovieStrategy).to.be.instanceOf(CreateMovieUsecase)
  })

  it('Should create movie', async () => {
    const { expectedResultAt, createdAt } = await createMovieStrategy.create(
      {
        title: faker.name.findName(),
        addToPlataform: {
          externalId: faker.datatype.uuid(),
        },
        authorName: faker.name.findName(),
        addedBy: {
          externalId: faker.datatype.uuid(),
        },
        movieCast: [
          {
            externalId: faker.datatype.uuid(),
          },
        ],
      },
      'test',
    )
    expect(expectedResultAt).to.be.instanceOf(Date)
    expect(createdAt).to.be.instanceOf(Date)
    expect(expectedResultAt.getTime()).to.be.equal(createdAt.getTime() + 5000)
  })
})
