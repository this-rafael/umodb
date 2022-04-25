import { ObjectType, Field } from '@nestjs/graphql'

export type ReviewTopicInputTypeBuilder = {
  title: string
}

@ObjectType()
export class ReviewTopicInputType {
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

  copyWith(other: Partial<ReviewTopicInputTypeBuilder>): ReviewTopicInputType {
    return new ReviewTopicInputType({
      title: other.title ?? this.title,
    })
  }
}
