import { CreationResultModel } from '../models/creation-result.model'

/**
 * This abstraction represents a protocol to publish any data on topic
 */
export abstract class EventPublisherProtocol {
  /**
   *  @description This method describe a common contract to publish any data on topic
   * @param params: EventPublisherParams - The params to publish the data
   * @returns Promise with the result of the publish
   */
  abstract send<T>({
    data,
    subscriptionId,
    topic,
  }: {
    topic: string
    data: T[]
    subscriptionId: string
  }): Promise<CreationResultModel[]>
}
