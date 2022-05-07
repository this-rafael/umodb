import { Decorators } from '../../adapter/decorators/inject.decorator'
import { SubscriptionUniqueIDProtocol } from '../protocols/produce-subscription-unique-id.protocol.ts'
import { SubscriptionUniqueIDStrategy } from '../strategies/produce-subscription-unique-id.strategy.ts'

@Decorators.Inject()
export class SubscriptionUniqueIDUsecase
  implements SubscriptionUniqueIDStrategy
{
  constructor(
    private readonly produceSubscriptionUniqueIDProtocol: SubscriptionUniqueIDProtocol,
  ) {}

  produce(): Promise<string> {
    return this.produceSubscriptionUniqueIDProtocol.produce()
  }

  verifyExistence(id: string): Promise<boolean> {
    return this.produceSubscriptionUniqueIDProtocol.verifyExistence(id)
  }

  async removeId(id: string): Promise<void> {
    await this.produceSubscriptionUniqueIDProtocol.removeId(id)
  }
}
