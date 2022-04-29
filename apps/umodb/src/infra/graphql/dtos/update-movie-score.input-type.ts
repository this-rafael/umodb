import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type UpdateMovieScoreInputTypeBuilder = {
  score?: number
  customer: { externalId: string }
  movie: { externalId: string }
}

@InputType()
export class UpdateMovieScoreInputType {
  @Field()
  score?: number

  @Field(() => ExternalIdInputType)
  customer!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  movie!: ExternalIdInputType

  constructor(builder: UpdateMovieScoreInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<UpdateMovieScoreInputTypeBuilder>,
  ): UpdateMovieScoreInputType {
    return new UpdateMovieScoreInputType({
      score: other.score ?? this.score,
      customer: other.customer ?? this.customer,
      movie: other.movie ?? this.movie,
    })
  }
}
