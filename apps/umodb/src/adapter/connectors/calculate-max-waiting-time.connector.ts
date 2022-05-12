import { CalculateMaxWaitingTimeProtocol } from '../../core/protocols/calculate-max-waiting-time.protocol'
import { Decorators } from '../decorators/inject.decorator'

@Decorators.Inject()
export class CalculateMaxWaitingTimeConnector
  implements CalculateMaxWaitingTimeProtocol
{
  async calculate(date: Date): Promise<Date> {
    return new Date(date.getTime() + 5 * 1000)
  }
}
