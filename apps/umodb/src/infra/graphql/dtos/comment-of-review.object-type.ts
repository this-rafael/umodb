import { Field, ObjectType } from '@nestjs/graphql'
import { CustomerObjectType } from './customer.object-type'
import { MovieObjectType } from './movie.object-type'
import { BasicReviewObjectType } from './review.object-type'

export type CommentOnReviewInputTypeBuilder = {
  externalId: string
  createdAt: Date
  updatedAt: Date
  content: string
  commentedBy: Partial<CustomerObjectType> & { externalId: string }
  commentOn: Partial<BasicReviewObjectType> & { externalId: string }
}

@ObjectType()
export class CommentOnReviewObjectType {
  @Field()
  externalId!: string

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date

  @Field()
  content!: string

  @Field(() => CustomerObjectType)
  commentedBy!: Partial<CustomerObjectType> & { externalId: string }

  @Field(() => BasicReviewObjectType)
  commentOn!: Partial<BasicReviewObjectType> & { externalId: string }

  constructor(builder: CommentOnReviewInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CommentOnReviewInputTypeBuilder>,
  ): CommentOnReviewObjectType {
    return new CommentOnReviewObjectType({
      externalId: other.externalId ?? this.externalId,
      createdAt: other.createdAt ?? this.createdAt,
      updatedAt: other.updatedAt ?? this.updatedAt,
      content: other.content ?? this.content,
      commentedBy: other.commentedBy ?? this.commentedBy,
      commentOn: other.commentOn ?? this.commentOn,
    })
  }
}
