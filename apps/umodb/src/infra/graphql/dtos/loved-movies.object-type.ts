import { Field, ObjectType } from '@nestjs/graphql'
import { CustomerObjectType } from './customer.object-type'
import { MovieObjectType } from './movie.object-type'

export type LovedMoviesObjectTypeBuilder = {
  externalId: string
  movie: Partial<MovieObjectType> & { externalId: string }
  lovedBy: Partial<CustomerObjectType> & { externalId: string }
}

@ObjectType()
export class LovedMoviesObjectType {
  @Field()
  externalId!: string

  @Field()
  movie!: MovieObjectType

  @Field()
  lovedBy!: CustomerObjectType

  constructor(builder: LovedMoviesObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<LovedMoviesObjectTypeBuilder>,
  ): LovedMoviesObjectType {
    return new LovedMoviesObjectType({
      externalId: other.externalId ?? this.externalId,
      movie: other.movie ?? this.movie,
      lovedBy: other.lovedBy ?? this.lovedBy,
    })
  }
}
