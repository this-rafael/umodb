import { Field, InputType } from '@nestjs/graphql'
import { ReviewTopicObjectType } from './review-topic.object-type'

export type CreateOrUpdateTopicReviewInputTypeBuilder = {
  externalId: string
  topic: ReviewTopicObjectType
  score: number
}

@InputType()
export class CreateOrUpdateCustomerTopicReviewObjectType {
  @Field()
  public readonly externalId!: string

  @Field(() => ReviewTopicObjectType)
  public readonly topic!: ReviewTopicObjectType

  @Field()
  public readonly score!: number

  constructor(builder: CreateOrUpdateTopicReviewInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateOrUpdateTopicReviewInputTypeBuilder>,
  ): CreateOrUpdateCustomerTopicReviewObjectType {
    return new CreateOrUpdateCustomerTopicReviewObjectType({
      externalId: other.externalId ?? this.externalId,
      topic: other.topic ?? this.topic,
      score: other.score ?? this.score,
    })
  }
}
