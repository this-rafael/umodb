import { Module, Provider } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import * as path from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import {
  ClientsModule,
  Transport,
  ClientKafka,
  ClientsModuleOptions,
} from '@nestjs/microservices'
import { Producer } from '@nestjs/microservices/external/kafka.interface'
import { OperatorResolver } from '../graphql/resolvers/operator.resolver'
import { MovieResolver } from '../graphql/resolvers/movie.resolver'
import { CustomerResolver } from '../graphql/resolvers/customer.resolver'
import { OperatorService } from '../../adapter/service/operator.service'
import { GlobalEnv } from '../global.env.model'
import { SubscriptionUniqueIDStrategy } from '../../core/strategies/produce-subscription-unique-id.strategy.ts'
import { SubscriptionUniqueIDUsecase } from '../../core/usecases/produce-subscription-unique-id.usecase.ts'
import { SubscriptionUniqueIDConnector } from '../../adapter/connectors/produce-subscription-unique-id.connector.ts'
import { SubscriptionUniqueIDProtocol } from '../../core/protocols/produce-subscription-unique-id.protocol.ts'
import { CreateOperatorStrategy } from '../../core/strategies/create-operator.strategy'
import { CreateOperatorUsecase } from '../../core/usecases/create-operator.usecase'
import { EventPublisherProtocol } from '../../core/protocols/event-publisher.protocol'
import { KafkaPublisherConnector } from '../../adapter/connectors/kafka-publisher.connector'
import { CalculateMaxWaitingTimeConnector } from '../../adapter/connectors/calculate-max-waiting-time.connector'
import { CalculateMaxWaitingTimeProtocol } from '../../core/protocols/calculate-max-waiting-time.protocol'
import { EventSubscriberStrategy } from '../../core/strategies/event-subscriber.strategy'
import { EventSubscriberUsecase } from '../../core/usecases/event-subscriber.usecase'
import { GetPubSubProtocol } from '../../core/protocols/pubsub-connection.protocol'
import { GetKafkaPubSubConnector } from '../../adapter/connectors/get-kafka-pub-sub.connector'
import { KafkaPubSubProvider } from '../kafka/kafka-pub-sub.provider'

export function getMicroServiceConnections(): ClientsModuleOptions {
  const response: ClientsModuleOptions = []

  console.log('global', GlobalEnv.instance)

  if (GlobalEnv.instance.useKafka) {
    response.push({
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9094'],
        },
        consumer: {
          groupId: `umodb-producer-${Math.random()}`,
        },
      },
    })
  }
  return response
}

function getProvider(): Provider[] {
  const providers: Provider[] = [
    KafkaPubSubProvider,
    OperatorResolver,
    MovieResolver,
    CustomerResolver,
    OperatorService,
    {
      provide: SubscriptionUniqueIDStrategy,
      useClass: SubscriptionUniqueIDUsecase,
    },
    {
      provide: SubscriptionUniqueIDProtocol,
      useClass: SubscriptionUniqueIDConnector,
    },
    {
      provide: CreateOperatorStrategy,
      useClass: CreateOperatorUsecase,
    },
    {
      provide: EventPublisherProtocol,
      useClass: KafkaPublisherConnector,
    },
    {
      provide: CalculateMaxWaitingTimeProtocol,
      useClass: CalculateMaxWaitingTimeConnector,
    },
    {
      provide: EventSubscriberStrategy,
      useClass: EventSubscriberUsecase,
    },
    {
      provide: GetPubSubProtocol,
      useClass: GetKafkaPubSubConnector,
    },
  ]

  if (GlobalEnv.instance.useKafka) {
    const provider = {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafka: ClientKafka): Promise<Producer> => {
        return kafka.connect()
      },
      inject: ['KAFKA_SERVICE'],
    }
    providers.push(provider)
  }

  return providers
}

@Module({
  imports: [
    ClientsModule.register(getMicroServiceConnections()),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'apps/umodb/src/schema.gql'),
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      context: ({ req, connection }) => {
        return connection
          ? {
              req: connection.context,
            }
          : {
              req,
            }
      },
      debug: true,
      playground: true,
      disableHealthCheck: true,
      cors: {
        credentials: true,
        origin: true,
      },
    }),
  ],
  providers: getProvider(),
})
export class AppModule {}
