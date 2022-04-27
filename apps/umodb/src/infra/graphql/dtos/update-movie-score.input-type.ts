import { Field, InputType } from '@nestjs/graphql'

export type UpdateMovieScoreInputTypeBuilder = {
  score?: number
  customer: { externalId: string }
  movie: { externalId: string }
}

@InputType()
export class UpdateMovieScoreInputType {
  @Field()
  score?: number

  @Field()
  customer!: { externalId: string }

  @Field()
  movie!: { externalId: string }

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
