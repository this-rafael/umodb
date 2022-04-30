import { InputType, Field } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type UpdateFullMovieReviewInputTypeBuilder = {
  externalId: string
  reviewer: { externalId: string }
  movie?: { externalId: string }
  title?: string
  reviewDescription?: string
  negativePoints?: string
  positivePoints?: string
}

@InputType()
export class UpdateFullMovieReviewInputType {
  @Field()
  public readonly externalId!: string

  @Field(() => ExternalIdInputType)
  public readonly reviewer!: ExternalIdInputType

  @Field(() => ExternalIdInputType, { nullable: true })
  public readonly movie?: { externalId: string }

  @Field({ nullable: true })
  public readonly title?: string

  @Field({ nullable: true })
  public readonly reviewDescription?: string

  @Field({ nullable: true })
  public readonly negativePoints?: string

  @Field({ nullable: true })
  public readonly positivePoints?: string

  constructor(builder: UpdateFullMovieReviewInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<UpdateFullMovieReviewInputTypeBuilder>,
  ): UpdateFullMovieReviewInputType {
    return new UpdateFullMovieReviewInputType({
      externalId: other.externalId ?? this.externalId,
      reviewer: other.reviewer ?? this.reviewer,
      movie: other.movie ?? this.movie,
      title: other.title ?? this.title,
      reviewDescription: other.reviewDescription ?? this.reviewDescription,
      negativePoints: other.negativePoints ?? this.negativePoints,
      positivePoints: other.positivePoints ?? this.positivePoints,
    })
  }
}
