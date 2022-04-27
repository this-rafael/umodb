import { Field, InputType } from '@nestjs/graphql'

export type CreateLovedMoviesInputTypeBuilder = {
  externalId: string
  movie: { externalId: string }
  lovedBy: { externalId: string }
}

@InputType()
export class CreateLovedMoviesInputType {
  @Field()
  externalId!: string

  @Field()
  movie!: { externalId: string }

  @Field()
  lovedBy!: { externalId: string }

  constructor(builder: CreateLovedMoviesInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateLovedMoviesInputTypeBuilder>,
  ): CreateLovedMoviesInputType {
    return new CreateLovedMoviesInputType({
      externalId: other.externalId ?? this.externalId,
      movie: other.movie ?? this.movie,
      lovedBy: other.lovedBy ?? this.lovedBy,
    })
  }
}
