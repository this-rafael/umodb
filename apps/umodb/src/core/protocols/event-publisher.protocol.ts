/**
 * This abstraction represents a strategy to publish any data on topic
 */
export abstract class EventPublisherProtocol {
  /**
   *  @description This method describe a common contract to publish any data on topic
   * @param params: EventPublisherParams - The params to publish the data
   * @returns Promise with the result of the publish
   */
  abstract send<T>({
    data,
    topic,
    subscriptionId,
  }: {
    data: T[]
    topic: string
    subscriptionId: string
  }): Promise<
    {
      topicName: string
      partition: number
      errorCode: number
      offset?: string
      timestamp?: string
      baseOffset?: string
      logAppendTime?: string
      logStartOffset?: string
    }[]
  >
}
