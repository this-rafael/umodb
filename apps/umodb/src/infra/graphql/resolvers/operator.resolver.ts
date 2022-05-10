import {
  Query,
  Args,
  Mutation,
  Resolver,
  Subscription,
  Context,
} from '@nestjs/graphql'
import { KafkaTopic } from '@app/kafka-topics/kafka-topics.enum'
import { KafkaPubSub } from 'graphql-kafka-subscriptions'
import { PubSub } from 'graphql-subscriptions'
import { OperatorService } from '../../../adapter/service/operator.service'
import { CreateOperatorInputType } from '../dtos/create-operator.input-type'
import { MutationResultPromiseObjectType } from '../dtos/mutation-result-promise.object-type'
import { OperatorObjectType } from '../dtos/operator.object-type'
import { SubscriptionUniqueIdObjectType } from '../dtos/subscription-unique-id.object-type'
import { GlobalEnv } from '../../global.env.model'
import { KafkaPubSubProvider } from '../../kafka/kafka-pub-sub.provider'

@Resolver()
export class OperatorResolver {
  constructor(
    private readonly operatorService: OperatorService,
    private readonly pubSub: KafkaPubSubProvider,
  ) {}

  @Mutation(() => MutationResultPromiseObjectType)
  async registerOperator(
    @Args({ name: 'subscriptionId', type: () => String })
    subscriptionId: string,
    @Args('operator') operator: CreateOperatorInputType,
  ): Promise<MutationResultPromiseObjectType> {
    return this.operatorService.registerOperator(operator, subscriptionId)
  }

  @Query(() => SubscriptionUniqueIdObjectType)
  async getUniqueId(): Promise<SubscriptionUniqueIdObjectType> {
    const id = await this.operatorService.getSubscriptionUniqueId()
    return new SubscriptionUniqueIdObjectType(id)
  }

  @Subscription(() => OperatorObjectType, {
    filter: (p, o) => {
      return true || p.subscriptionId === o.subscriptionId
    },
    resolve: p => {
      const { data } = p
      data.createdAt = new Date(data.createdAt)
      return p.data
    },
  })
  subscribeOperatorCreation(
    @Args({ name: 'subscriptionId', type: () => String })
    _: never,
  ): AsyncIterator<Partial<OperatorObjectType>> {
    return this.pubSub.commitCreateOperator.asyncIterator(
      KafkaTopic.COMMIT_CREATE_OPERATOR,
    )
  }
}
