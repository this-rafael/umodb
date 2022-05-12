import { Module } from '@nestjs/common'
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices'
import { Producer } from '@nestjs/microservices/external/kafka.interface'
import { CreateOperatorConnector } from '../../adapter/connectors/create-operator.connector.ts'
import { KafkaPublisherConnector } from '../../adapter/connectors/kafka-publisher.connector'
import { PrismaConnector } from '../../adapter/connectors/prisma.connector'
import { OperatorService } from '../../adapter/service/operator.service'
import { CreateOperatorProtocol } from '../../core/protocols/create-operator.protocol.ts'
import { EventPublisherProtocol } from '../../core/protocols/event-publisher.protocol'
import { CreateOperatorStrategy } from '../../core/strategies/create-operator.strategy.ts'
import { CreateOperatorUsecase } from '../../core/usecases/create-operator.usecase.ts'
import { OperatorController } from '../controllers/operator.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9094'],
          },
          consumer: {
            groupId: `movie-producer${Math.random()}`,
          },
        },
      },
    ]),
  ],
  controllers: [OperatorController],
  providers: [
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaService: ClientKafka): Promise<Producer> => {
        return kafkaService.connect()
      },
      inject: ['KAFKA_SERVICE'],
    },
    PrismaConnector,

    OperatorService,
    {
      provide: CreateOperatorStrategy,
      useClass: CreateOperatorUsecase,
    },
    {
      provide: CreateOperatorProtocol,
      useClass: CreateOperatorConnector,
    },
    {
      provide: EventPublisherProtocol,
      useClass: KafkaPublisherConnector,
    },
  ],
})
export class MovieMicroserviceModule {}
