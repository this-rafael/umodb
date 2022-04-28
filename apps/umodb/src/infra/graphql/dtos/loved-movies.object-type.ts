import { Field, ObjectType } from '@nestjs/graphql'
import { CustomerObjectType } from './customer.object-type'
import { MovieObjectType } from './movie.object-type'

export type LovedMoviesObjectTypeBuilder = {
  externalId: string
  movie: Partial<MovieObjectType> & { externalId: string }
  lovedBy: Partial<CustomerObjectType> & { externalId: string }
  deleted?: boolean
}

@ObjectType()
export class LovedMoviesObjectType {
  @Field()
  public readonly externalId!: string

  @Field(() => MovieObjectType)
  public readonly movie!: MovieObjectType

  @Field(() => CustomerObjectType)
  public readonly lovedBy!: CustomerObjectType

  @Field()
  public readonly deleted?: boolean

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
      deleted: other.deleted ?? this.deleted,
      externalId: other.externalId ?? this.externalId,
      movie: other.movie ?? this.movie,
      lovedBy: other.lovedBy ?? this.lovedBy,
    })
  }
}
