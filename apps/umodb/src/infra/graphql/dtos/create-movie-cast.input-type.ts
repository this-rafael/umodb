import { Field, InputType } from '@nestjs/graphql'

export type CreateMovieCastInputTypeBuilder = {
  movieId: { externalId: string }
  actorId: { externalId: string }
  addedBy: { externalId: string }
}

@InputType()
export class CreateMovieCastInputType {
  @Field()
  public readonly movieId!: { externalId: string }

  @Field()
  public readonly actorId!: { externalId: string }

  @Field()
  public readonly addedBy!: { externalId: string }

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
