import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SubscriptionUniqueIdObjectType {
  @Field(() => String)
  public id!: string

  constructor(id: string) {
    console.log(id)
    this.id = id
  }
}
