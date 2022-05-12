import { v4 as uuidv4 } from 'uuid'
import { SubscriptionUniqueIDProtocol } from '../../core/protocols/produce-subscription-unique-id.protocol.ts'

import { Decorators } from '../decorators/inject.decorator'

@Decorators.Inject()
export class SubscriptionUniqueIDConnector
  implements SubscriptionUniqueIDProtocol
{
  private generatedIds: string[] = []

  async produce(): Promise<string> {
    const id = `${uuidv4()}-${uuidv4()}-${Math.random()}-${new Date().getTime()}`
    this.generatedIds.push(id)
    return id
  }

  async verifyExistence(id: string): Promise<boolean> {
    return this.generatedIds.includes(id)
  }

  async removeId(id: string): Promise<void> {
    this.generatedIds.filter(i => i !== id)
  }
}
