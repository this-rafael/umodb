import { Field, ObjectType } from '@nestjs/graphql'
import { MovieObjectType } from './movie.object-type'
import { ReviewerObjectType } from './reviewer.object-type'

export type FullMovieReviewObjectTypeBuilder = {
  externalId: string
  createdAt: Date
  updatedAt: Date
  reviewer: Partial<ReviewerObjectType> & { externalId: string }
  movie: Partial<MovieObjectType> & { externalId: string }
  title: string
  reviewDescription: string
  negativePoints: string
  positivePoints: string
}

@ObjectType()
export class FullMovieReviewObjectType {
  @Field()
  public readonly externalId!: string

  @Field()
  public readonly createdAt!: Date

  @Field()
  public readonly updatedAt!: Date

  @Field(() => ReviewerObjectType)
  public readonly reviewer!: Partial<ReviewerObjectType> & {
    externalId: string
  }

  @Field(() => MovieObjectType)
  public readonly movie!: Partial<MovieObjectType> & { externalId: string }

  @Field()
  public readonly title!: string

  @Field()
  public readonly reviewDescription!: string

  @Field()
  public readonly negativePoints!: string

  @Field()
  public readonly positivePoints!: string

  constructor(builder: FullMovieReviewObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<FullMovieReviewObjectTypeBuilder>,
  ): FullMovieReviewObjectType {
    return new FullMovieReviewObjectType({
      externalId: other.externalId ?? this.externalId,
      createdAt: other.createdAt ?? this.createdAt,
      updatedAt: other.updatedAt ?? this.updatedAt,
      reviewer: other.reviewer ?? this.reviewer,
      movie: other.movie ?? this.movie,
      title: other.title ?? this.title,
      reviewDescription: other.reviewDescription ?? this.reviewDescription,
      negativePoints: other.negativePoints ?? this.negativePoints,
      positivePoints: other.positivePoints ?? this.positivePoints,
    })
  }
}
