import {
  Query,
  Args,
  Mutation,
  Resolver,
  Subscription,
  PartialType,
} from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { KafkaTopic } from '@app/kafka-topics/kafka-topics.enum'
import { OperatorService } from '../../../adapter/service/operator.service'

import { CreateOperatorInputType } from '../dtos/create-operator.input-type'
import { MutationResultPromiseObjectType } from '../dtos/mutation-result-promise.object-type'
import { OperatorObjectType } from '../dtos/operator.object-type'
import { SubscriptionUniqueIdObjectType } from '../dtos/subscription-unique-id.object-type'

const pubSub = new PubSub()

@Resolver()
export class OperatorResolver {
  constructor(private readonly operatorService: OperatorService) {}

  @Mutation(() => MutationResultPromiseObjectType)
  async registerOperator(
    @Args({ name: 'id', type: () => String }) subscriptionId: string,
    @Args('operator') operator: CreateOperatorInputType,
  ): Promise<MutationResultPromiseObjectType> {
    return this.operatorService.registerOperator(operator, subscriptionId)
  }

  @Query(() => SubscriptionUniqueIdObjectType)
  async getUniqueId(): Promise<SubscriptionUniqueIdObjectType> {
    const id = await this.operatorService.getSubscriptionUniqueId()
    return new SubscriptionUniqueIdObjectType(id)
  }

  @Subscription(() => PartialType(OperatorObjectType), {
    filter: (p, o) => {
      return p.subscriptionId === o.subscriptionId
    },
    resolve: v => {
      return v.data
    },
  })
  subscribeOperatorCreation(
    @Args({ name: 'id', type: () => String }) subscriptionId: string,
  ): AsyncIterator<Partial<OperatorObjectType>> {
    return this.operatorService.subscribeOperatorCreation(
      KafkaTopic.COMMIT_CREATE_OPERATOR,
    )
  }
}
