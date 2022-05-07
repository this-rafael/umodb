export abstract class SubscriptionUniqueIDStrategy {
  abstract produce(): Promise<string>

  abstract verifyExistence(id: string): Promise<boolean>

  abstract removeId(id: string): Promise<void>
}
