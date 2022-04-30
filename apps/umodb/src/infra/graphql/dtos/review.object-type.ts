import { Field, ObjectType } from '@nestjs/graphql'
import { CustomerObjectType } from './customer.object-type'
import { MovieObjectType } from './movie.object-type'

export type BaseReviewObjectTypeBuilder = {
  externalId: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  customer: Partial<CustomerObjectType> & { externalId: string }
  movie: Partial<MovieObjectType> & { externalId: string }
}

@ObjectType()
export class BasicReviewObjectType {
  @Field()
  externalId!: string

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date

  @Field()
  title!: string

  @Field()
  description!: string

  @Field(() => CustomerObjectType)
  customer!: CustomerObjectType

  @Field(() => MovieObjectType)
  movie!: MovieObjectType

  constructor(builder: BaseReviewObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<BaseReviewObjectTypeBuilder>): BasicReviewObjectType {
    return new BasicReviewObjectType({
      externalId: other.externalId ?? this.externalId,
      createdAt: other.createdAt ?? this.createdAt,
      updatedAt: other.updatedAt ?? this.updatedAt,
      title: other.title ?? this.title,
      description: other.description ?? this.description,
      customer: other.customer ?? this.customer,
      movie: other.movie ?? this.movie,
    })
  }
}
