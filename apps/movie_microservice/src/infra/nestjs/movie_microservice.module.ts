import { Module } from '@nestjs/common'
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices'
import { Producer } from '@nestjs/microservices/external/kafka.interface'

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
  controllers: [],
  providers: [
    {
      provide: 'KAFKA_PRODUCER_MAILER',
      useFactory: async (kafkaService: ClientKafka): Promise<Producer> => {
        return kafkaService.connect()
      },
      inject: ['KAFKA_SERVICE'],
    },
  ],
})
export class MovieMicroserviceModule {}
