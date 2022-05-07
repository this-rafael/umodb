export abstract class EventPublisherProtocol {
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
