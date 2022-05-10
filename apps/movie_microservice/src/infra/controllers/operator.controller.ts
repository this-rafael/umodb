import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { KafkaTopic } from '@app/kafka-topics/kafka-topics.enum'
import { CreateOperatorModel } from '../../core/models/create-operator.model'
import { GetKafkaMessageValue } from '../pipes/get-kafka-message-value.pipe'
import { OperatorService } from '../../adapter/service/operator.service'

@Controller()
export class OperatorController {
  constructor(private readonly service: OperatorService) {}

  @MessagePattern(KafkaTopic.CREATE_OPERATOR)
  async create(
    @Payload(new GetKafkaMessageValue()) operator: CreateOperatorModel,
  ): Promise<void> {
    return this.service.create(operator)
  }
}
