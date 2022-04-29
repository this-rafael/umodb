import { Field, ObjectType } from '@nestjs/graphql'
import { CustomerObjectType } from './customer.object-type'
import { BasicReviewObjectType } from './review.object-type'

export type ReviewEvaluationObjectTypeBuilder = {
  externalId: string
  createdAt: Date
  updatedAt: Date
  evaluation: number
  evaluatedBy: Partial<CustomerObjectType> & { externalId: string }
  commentOn: Partial<BasicReviewObjectType> & { externalId: string }
}

@ObjectType()
export class ReviewEvaluationObjectType {
  @Field()
  externalId!: string

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date

  @Field()
  evaluation!: number

  @Field(() => CustomerObjectType)
  evaluatedBy!: CustomerObjectType

  @Field(() => BasicReviewObjectType)
  commentOn!: Partial<BasicReviewObjectType> & { externalId: string }

  constructor(builder: ReviewEvaluationObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<ReviewEvaluationObjectTypeBuilder>,
  ): ReviewEvaluationObjectType {
    return new ReviewEvaluationObjectType({
      externalId: other.externalId ?? this.externalId,
      createdAt: other.createdAt ?? this.createdAt,
      updatedAt: other.updatedAt ?? this.updatedAt,
      evaluation: other.evaluation ?? this.evaluation,
      evaluatedBy: other.evaluatedBy ?? this.evaluatedBy,
      commentOn: other.commentOn ?? this.commentOn,
    })
  }
}
