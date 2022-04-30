import { Field, ObjectType } from '@nestjs/graphql'
import { ReviewTopicObjectType } from './review-topic.object-type'

export type CustomerTopicReviewInputTypeBuilder = {
  externalId: string
  topic: ReviewTopicObjectType
  score: number
}

@ObjectType()
export class CustomerTopicReviewObjectType {
  @Field()
  public readonly externalId!: string

  @Field(() => ReviewTopicObjectType)
  public readonly topic!: ReviewTopicObjectType

  @Field()
  public readonly score!: number

  constructor(builder: CustomerTopicReviewInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CustomerTopicReviewInputTypeBuilder>,
  ): CustomerTopicReviewObjectType {
    return new CustomerTopicReviewObjectType({
      externalId: other.externalId ?? this.externalId,
      topic: other.topic ?? this.topic,
      score: other.score ?? this.score,
    })
  }
}
