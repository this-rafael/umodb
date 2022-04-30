import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

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

  @Field(() => ExternalIdInputType)
  public readonly reviewer!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  public readonly movie!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  public readonly actor!: ExternalIdInputType

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
