import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type CreateBasicMovieReviewInputTypeBuilder = {
  title: string
  description: string
  customer: { externalId: string }
  movie: { externalId: string }
}

@InputType()
export class CreateBasicMovieReviewInputType {
  @Field()
  title!: string

  @Field()
  description!: string

  @Field(() => ExternalIdInputType)
  customer!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  movie!: ExternalIdInputType

  constructor(builder: CreateBasicMovieReviewInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateBasicMovieReviewInputTypeBuilder>,
  ): CreateBasicMovieReviewInputType {
    return new CreateBasicMovieReviewInputType({
      title: other.title ?? this.title,
      description: other.description ?? this.description,
      customer: other.customer ?? this.customer,
      movie: other.movie ?? this.movie,
    })
  }
}
