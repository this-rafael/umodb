import { Query, Args, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { KafkaTopic } from '@app/kafka-topics/kafka-topics.enum'
import { OperatorService } from '../../../adapter/service/operator.service'
import { CreateOperatorInputType } from '../dtos/create-operator.input-type'
import { MutationResultPromiseObjectType } from '../dtos/mutation-result-promise.object-type'
import { OperatorObjectType } from '../dtos/operator.object-type'
import { SubscriptionUniqueIdObjectType } from '../dtos/subscription-unique-id.object-type'
import { KafkaPubSubProvider } from '../../kafka/kafka-pub-sub.provider'
import { ResolverDescriptions } from '../resolver-descriptions.enum'

@Resolver()
export class OperatorResolver {
  constructor(
    private readonly operatorService: OperatorService,
    private readonly pubSub: KafkaPubSubProvider,
  ) {}

  @Mutation(() => MutationResultPromiseObjectType, {
    description: ResolverDescriptions.REGISTER_OPERATOR,
  })
  async registerOperator(
    @Args({ name: 'subscriptionId', type: () => String })
    subscriptionId: string,
    @Args('operator') operator: CreateOperatorInputType,
  ): Promise<MutationResultPromiseObjectType> {
    return this.operatorService.registerOperator(operator, subscriptionId)
  }

  @Query(() => SubscriptionUniqueIdObjectType, {
    description:
      'Get subscription unique id returns a unique id for subscription for allow the listen realtime events',
  })
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
    description: `This subscription allow to listen the creation of operator on kafka topic`,
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
