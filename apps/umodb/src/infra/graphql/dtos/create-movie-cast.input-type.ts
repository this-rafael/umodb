import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type CreateMovieCastInputTypeBuilder = {
  movieId: { externalId: string }
  actorId: { externalId: string }
  addedBy: { externalId: string }
}

@InputType()
export class CreateMovieCastInputType {
  @Field(() => ExternalIdInputType)
  public readonly movieId!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  public readonly actorId!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  public readonly addedBy!: ExternalIdInputType

  constructor(builder: CreateMovieCastInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateMovieCastInputTypeBuilder>,
  ): CreateMovieCastInputType {
    return new CreateMovieCastInputType({
      movieId: other.movieId ?? this.movieId,
      actorId: other.actorId ?? this.actorId,
      addedBy: other.addedBy ?? this.addedBy,
    })
  }
}
