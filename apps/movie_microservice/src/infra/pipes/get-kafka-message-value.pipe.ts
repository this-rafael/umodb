import { PipeTransform, Injectable } from '@nestjs/common'
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface'

@Injectable()
export class GetKafkaMessageValue<T> implements PipeTransform<KafkaMessage> {
  transform(value: KafkaMessage): T {
    return value.value as unknown as T
  }
}
