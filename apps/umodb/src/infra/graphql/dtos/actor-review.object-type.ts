import { ObjectType, Field } from '@nestjs/graphql'
import { ActorObjectType } from './actor.object-type'
import { MovieObjectType } from './movie.object-type'
import { ReviewerObjectType } from './reviewer.object-type'

export type ActorReviewObjectTypeBuilder = {
  review: string
  reviewer: Partial<ReviewerObjectType> & { externalId: string }
  movie: Partial<MovieObjectType> & { externalId: string }
  actor: Partial<ActorObjectType> & { externalId: string }
}

@ObjectType()
export class ActorReviewObjectType {
  @Field()
  public readonly review!: string

  @Field(() => ReviewerObjectType)
  public readonly reviewer!: Partial<ReviewerObjectType> & {
    externalId: string
  }

  @Field(() => MovieObjectType)
  public readonly movie!: Partial<MovieObjectType> & { externalId: string }

  @Field(() => ActorObjectType)
  public readonly actor!: Partial<ActorObjectType> & { externalId: string }

  constructor(builder: ActorReviewObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<ActorReviewObjectTypeBuilder>,
  ): ActorReviewObjectType {
    return new ActorReviewObjectType({
      review: other.review ?? this.review,
      reviewer: other.reviewer ?? this.reviewer,
      movie: other.movie ?? this.movie,
      actor: other.actor ?? this.actor,
    })
  }
}
