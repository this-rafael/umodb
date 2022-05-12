/**
 * This abstraction represents a strategy handler with subscription id
 */
export abstract class SubscriptionUniqueIDProtocol {
  /**
   * @description This method describe a common contract to produce a subscription unique id
   */
  abstract produce(): Promise<string>

  /**
   * @description This method describe a common contract to verify if a subscription unique id is already created
   * @param id - The subscription id
   */
  abstract verifyExistence(id: string): Promise<boolean>

  /**
   * @description This method describe a common contract to delete a subscription unique id
   * @param id - The subscription id
   */
  abstract removeId(id: string): Promise<void>
}
