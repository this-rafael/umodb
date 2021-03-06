export abstract class EventPublisherProtocol {
  abstract send<T>({ data, topic }: { data: T[]; topic: string }): Promise<
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
