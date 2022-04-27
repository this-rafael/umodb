import { Field, InputType } from '@nestjs/graphql'

export type UpdateReviewInputTypeBuilder = {
  title?: string
  description?: string
  customer: { externalId: string }
  movie: { externalId: string }
}

@InputType()
export class UpdateReviewInputType {
  @Field()
  title?: string

  @Field()
  description?: string

  @Field()
  customer!: { externalId: string }

  @Field()
  movie!: { externalId: string }

  constructor(builder: UpdateReviewInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<UpdateReviewInputTypeBuilder>,
  ): UpdateReviewInputType {
    return new UpdateReviewInputType({
      title: other.title ?? this.title,
      description: other.description ?? this.description,
      customer: other.customer ?? this.customer,
      movie: other.movie ?? this.movie,
    })
  }
}
