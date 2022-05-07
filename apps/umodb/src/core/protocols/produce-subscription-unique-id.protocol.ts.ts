export abstract class SubscriptionUniqueIDProtocol {
  abstract produce(): Promise<string>

  abstract verifyExistence(id: string): Promise<boolean>

  abstract removeId(id: string): Promise<void>
}
