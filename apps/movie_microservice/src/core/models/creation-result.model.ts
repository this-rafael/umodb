export interface CreationResultModel {
  topicName: string
  errorCode: number
  partition?: number
  offset?: string
  timestamp?: string
  baseOffset?: string
  logAppendTime?: string
  logStartOffset?: string
}
