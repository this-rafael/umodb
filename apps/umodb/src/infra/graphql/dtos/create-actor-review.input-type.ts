import { Field, InputType } from '@nestjs/graphql'

export type CreateActorReviewInputBuilder = {
  review: string
  reviewer: { externalId: string }
  movie: { externalId: string }
  actor: { externalId: string }
}

@InputType()
export class CreateActorReviewInput {
  @Field()
  public readonly review!: string

  @Field()
  public readonly reviewer!: { externalId: string }

  @Field()
  public readonly movie!: { externalId: string }

  @Field()
  public readonly actor!: { externalId: string }

  constructor(builder: CreateActorReviewInputBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateActorReviewInputBuilder>,
  ): CreateActorReviewInput {
    return new CreateActorReviewInput({
      review: other.review ?? this.review,
      reviewer: other.reviewer ?? this.reviewer,
      movie: other.movie ?? this.movie,
      actor: other.actor ?? this.actor,
    })
  }
}
