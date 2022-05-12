import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({
  description: 'SubscriptionUniqueId is a DTO for subscription unique id',
})
export class SubscriptionUniqueIdObjectType {
  @Field(() => String, {
    description: 'Subscription unique id',
  })
  public id!: string

  constructor(id: string) {
    this.id = id
  }
}
