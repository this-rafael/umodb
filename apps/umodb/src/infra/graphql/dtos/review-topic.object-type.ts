import { ObjectType, Field } from '@nestjs/graphql'

export type ReviewTopicInputTypeBuilder = {
  externalId: string
  title: string
}

@ObjectType()
export class ReviewTopicObjectType {
  @Field()
  public readonly externalId!: string

  @Field()
  public readonly title!: string

  constructor(builder: ReviewTopicInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<ReviewTopicInputTypeBuilder>): ReviewTopicObjectType {
    return new ReviewTopicObjectType({
      externalId: other.externalId ?? this.externalId,
      title: other.title ?? this.title,
    })
  }
}
