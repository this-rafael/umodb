import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type CreateLovedMoviesInputTypeBuilder = {
  movie: { externalId: string }
  lovedBy: { externalId: string }
}

@InputType()
export class CreateLovedMoviesInputType {
  @Field(() => ExternalIdInputType)
  movie!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  lovedBy!: ExternalIdInputType

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
      movie: other.movie ?? this.movie,
      lovedBy: other.lovedBy ?? this.lovedBy,
    })
  }
}
