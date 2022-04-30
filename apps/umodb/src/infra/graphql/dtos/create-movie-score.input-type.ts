import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type CreateMovieScoreInputTypeBuilder = {
  score: number
  customer: { externalId: string }
  movie: { externalId: string }
}

@InputType()
export class CreateMovieScoreInputType {
  @Field()
  score!: number

  @Field(() => ExternalIdInputType)
  customer!: ExternalIdInputType

  @Field()
  movie!: ExternalIdInputType

  constructor(builder: CreateMovieScoreInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateMovieScoreInputTypeBuilder>,
  ): CreateMovieScoreInputType {
    return new CreateMovieScoreInputType({
      score: other.score ?? this.score,
      customer: other.customer ?? this.customer,
      movie: other.movie ?? this.movie,
    })
  }
}
