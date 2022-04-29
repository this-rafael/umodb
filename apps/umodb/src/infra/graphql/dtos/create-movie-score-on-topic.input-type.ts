import { InputType, Field } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type CreateMovieScoreOnTopicInputTypeBuilder = {
  fkMovie: { externalId: string }
  fkTopic: { externalId: string }
  score: number
}

@InputType()
export class CreateMovieScoreOnTopicInputType {
  @Field(() => ExternalIdInputType)
  public readonly fkMovie!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  public readonly fkTopic!: ExternalIdInputType

  @Field()
  public readonly score!: number

  constructor(builder: CreateMovieScoreOnTopicInputTypeBuilder) {
    Object.assign(this, builder)
  }

  // implement to map, toString and copyWith
  toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateMovieScoreOnTopicInputTypeBuilder>,
  ): CreateMovieScoreOnTopicInputType {
    return new CreateMovieScoreOnTopicInputType({
      fkMovie: other.fkMovie ?? this.fkMovie,
      fkTopic: other.fkTopic ?? this.fkTopic,
      score: other.score ?? this.score,
    })
  }
}
