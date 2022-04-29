import { InputType, Field } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type CreateFullMovieReviewInputTypeBuilder = {
  externalId: string
  createdAt: Date
  reviewer: { externalId: string }
  movie: { externalId: string }
  title: string
  reviewDescription: string
  negativePoints: string
  positivePoints: string
}

@InputType()
export class CreateFullMovieReviewInputType {
  @Field()
  public readonly externalId!: string

  @Field()
  public readonly createdAt!: Date

  @Field(() => ExternalIdInputType)
  public readonly reviewer!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  public readonly movie!: ExternalIdInputType

  @Field()
  public readonly title!: string

  @Field()
  public readonly reviewDescription!: string

  @Field()
  public readonly negativePoints!: string

  @Field()
  public readonly positivePoints!: string

  constructor(builder: CreateFullMovieReviewInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateFullMovieReviewInputTypeBuilder>,
  ): CreateFullMovieReviewInputType {
    return new CreateFullMovieReviewInputType({
      externalId: other.externalId ?? this.externalId,
      createdAt: other.createdAt ?? this.createdAt,
      reviewer: other.reviewer ?? this.reviewer,
      movie: other.movie ?? this.movie,
      title: other.title ?? this.title,
      reviewDescription: other.reviewDescription ?? this.reviewDescription,
      negativePoints: other.negativePoints ?? this.negativePoints,
      positivePoints: other.positivePoints ?? this.positivePoints,
    })
  }
}
