import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { KafkaTopic } from '@app/kafka-topics/kafka-topics.enum'

import { GetKafkaMessageValue } from '../pipes/get-kafka-message-value.pipe'

@Controller()
export class MovieController {
  constructor(private readonly service: MovieService) {}

  @MessagePattern(KafkaTopic.CREATE_MOVIE)
  async create(
    @Payload(new GetKafkaMessageValue()) Movie: CreateMovieModel,
  ): Promise<void> {
    return this.service.create(Movie)
  }
}
