import { Field, ObjectType } from '@nestjs/graphql'
import { CustomerObjectType } from './customer.object-type'
import { MovieObjectType } from './movie.object-type'

export type MovieInfoByCustumerObjectTypeBuilder = {
  customer: Partial<CustomerObjectType> & { externalId: string }
  movie: Partial<MovieObjectType> & { externalId: string }
  isLoved: boolean
  score?: number
}

@ObjectType()
export class MovieInfoByCustumerObjectType {
  @Field(() => CustomerObjectType)
  public readonly customer!: CustomerObjectType

  @Field(() => MovieObjectType)
  public readonly movie!: MovieObjectType

  @Field()
  public readonly isLoved!: boolean

  @Field()
  public readonly score?: number

  constructor(builder: MovieInfoByCustumerObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<MovieInfoByCustumerObjectType>,
  ): MovieInfoByCustumerObjectType {
    return new MovieInfoByCustumerObjectType({
      isLoved: other.isLoved ?? this.isLoved,
      score: other.score ?? this.score,
      customer: other.customer ?? this.customer,
      movie: other.movie ?? this.movie,
    })
  }
}
