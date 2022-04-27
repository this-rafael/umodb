import { Field, ObjectType } from '@nestjs/graphql'
import { FullMovieReviewObjectType } from './full-movie-review.object-type'
import { ReviewerObjectType } from './reviewer.object-type'

export type MovieScoreOnTopicObjectTypeBuilder = {
  externalId: string
  score: number
  fullMovieReview: Partial<FullMovieReviewObjectType> & { externalId: string }
  reviewTopic: Partial<ReviewerObjectType> & { externalId: string }
}

@ObjectType()
export class MovieScoreOnTopicObjectType {
  @Field()
  public readonly externalId!: string

  @Field()
  public readonly score!: number

  @Field()
  public readonly fullMovieReview!: Partial<FullMovieReviewObjectType> & {
    externalId: string
  }

  @Field()
  public readonly reviewTopic!: Partial<ReviewerObjectType> & {
    externalId: string
  }

  constructor(builder: MovieScoreOnTopicObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<MovieScoreOnTopicObjectTypeBuilder>,
  ): MovieScoreOnTopicObjectType {
    return new MovieScoreOnTopicObjectType({
      externalId: other.externalId ?? this.externalId,
      score: other.score ?? this.score,
      fullMovieReview: other.fullMovieReview ?? this.fullMovieReview,
      reviewTopic: other.reviewTopic ?? this.reviewTopic,
    })
  }
}
