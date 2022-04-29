import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type UpdateBasicMovieReviewInputTypeBuilder = {
  title?: string
  description?: string
  customer: { externalId: string }
  movie: { externalId: string }
}

@InputType()
export class UpdateBasicMovieReviewInputType {
  @Field()
  title?: string

  @Field()
  description?: string

  @Field(() => ExternalIdInputType)
  customer!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  movie!: ExternalIdInputType

  constructor(builder: UpdateBasicMovieReviewInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<UpdateBasicMovieReviewInputTypeBuilder>,
  ): UpdateBasicMovieReviewInputType {
    return new UpdateBasicMovieReviewInputType({
      title: other.title ?? this.title,
      description: other.description ?? this.description,
      customer: other.customer ?? this.customer,
      movie: other.movie ?? this.movie,
    })
  }
}
