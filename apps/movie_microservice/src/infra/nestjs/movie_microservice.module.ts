import { Module } from '@nestjs/common'
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices'
import { Producer } from '@nestjs/microservices/external/kafka.interface'
import { CreateOperatorPrismaConnector } from '../../adapter/connectors/create-operator-prisma.connector.ts'
import { KafkaPublisherConnector } from '../../adapter/connectors/kafka-publisher.connector'
import { PrismaHandler } from '../handler/prisma.handler'
import { OperatorService } from '../../adapter/service/operator.service'
import { RegisterOperatorProtocol } from '../../core/protocols/register-operator.protocol.ts'
import { EventPublisherProtocol } from '../../core/protocols/event-publisher.protocol'
import { CreateOperatorStrategy } from '../../core/strategies/register-operator.strategy.ts'
import { CreateOperatorUsecase } from '../../core/usecases/register-operator.usecase.ts'
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
    PrismaHandler,

    OperatorService,
    {
      provide: CreateOperatorStrategy,
      useClass: CreateOperatorUsecase,
    },
    {
      provide: RegisterOperatorProtocol,
      useClass: CreateOperatorPrismaConnector,
    },
    {
      provide: EventPublisherProtocol,
      useClass: KafkaPublisherConnector,
    },
  ],
})
export class MovieMicroserviceModule {}
