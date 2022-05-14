import { expect } from 'chai'

import { Test, TestingModule } from '@nestjs/testing'

import { CalculateMaxWaitingTimeProtocol } from '../../src/core/protocols/calculate-max-waiting-time.protocol'
import { CalculateMaxWaitingTimeConnector } from '../../src/adapter/connectors/calculate-max-waiting-time.connector'
import { getProvider } from '../../../../libs/provider-generation-functions/src'

/**
 * Test CalculateMaxWaitingTimeConnector class and CalculateMaxWaitingTimeProtocol class
 */

describe('CalculateMaxWaitingTimeProtocol', () => {
  let calculateMaxWaitingTimeProtocol: CalculateMaxWaitingTimeProtocol

  before(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        getProvider(
          CalculateMaxWaitingTimeProtocol,
          CalculateMaxWaitingTimeConnector,
        ),
      ],
    }).compile()
    calculateMaxWaitingTimeProtocol =
      module.get<CalculateMaxWaitingTimeProtocol>(
        CalculateMaxWaitingTimeProtocol,
      )
  })

  /**
   * Test if call calculateMaxWaitingTimeProtocol.calculate() passing now date retuns a current date + 5 seconds
   */
  it('should return a current date + 5 seconds', async () => {
    const now = new Date()
    const expectedResultAt = new Date(now.getTime() + 5000)
    const result = await calculateMaxWaitingTimeProtocol.calculate(now)
    expect(result).to.be.instanceOf(Date)
    expect(result.getTime()).to.be.equal(expectedResultAt.getTime())
  })
})
