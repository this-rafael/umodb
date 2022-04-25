import { Field, InputType } from '@nestjs/graphql'

export type CreateReviewTopicInputTypeBuilder = {
  title: string
}

@InputType()
export class CreateReviewTopicInputType {
  @Field()
  public readonly title!: string

  constructor(builder: CreateReviewTopicInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateReviewTopicInputTypeBuilder>,
  ): CreateReviewTopicInputType {
    return new CreateReviewTopicInputType({
      title: other.title ?? this.title,
    })
  }
}
