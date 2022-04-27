import { Field, ObjectType } from '@nestjs/graphql'
import { CustomerObjectType } from './customer.object-type'
import { MovieObjectType } from './movie.object-type'

export type MovieScoreObjectTypeBuilder = {
  externalId: string
  score: number
  createdAt: Date
  updatedAt: Date
  customer: Partial<CustomerObjectType> & { externalId: string }
  movie: Partial<MovieObjectType> & { externalId: string }
}

@ObjectType()
export class MovieScoreObjectType {
  @Field()
  externalId!: string

  @Field()
  score!: number

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date

  @Field(() => CustomerObjectType)
  customer!: CustomerObjectType

  @Field(() => MovieObjectType)
  movie!: MovieObjectType

  constructor(builder: MovieScoreObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<MovieScoreObjectTypeBuilder>): MovieScoreObjectType {
    return new MovieScoreObjectType({
      externalId: other.externalId ?? this.externalId,
      score: other.score ?? this.score,
      createdAt: other.createdAt ?? this.createdAt,
      updatedAt: other.updatedAt ?? this.updatedAt,
      customer: other.customer ?? this.customer,
      movie: other.movie ?? this.movie,
    })
  }
}
