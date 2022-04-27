import { Field, InputType } from '@nestjs/graphql'

export type ToogleLovedMoviesInputTypeBuilder = {
  externalId: string
  movie: { externalId: string }
  lovedBy: { externalId: string }
}

@InputType()
export class ToogleLovedMoviesInputType {
  @Field()
  externalId!: string

  @Field()
  movie!: { externalId: string }

  @Field()
  lovedBy!: { externalId: string }

  constructor(builder: ToogleLovedMoviesInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<ToogleLovedMoviesInputTypeBuilder>,
  ): ToogleLovedMoviesInputType {
    return new ToogleLovedMoviesInputType({
      externalId: other.externalId ?? this.externalId,
      movie: other.movie ?? this.movie,
      lovedBy: other.lovedBy ?? this.lovedBy,
    })
  }
}
