import { Field, InputType } from '@nestjs/graphql'

export type UpdateReviewEvaluationInputTypeBuilder = {
  evaluation?: number
  evaluatedBy: { externalId: string }
  commentOn: { externalId: string }
}

@InputType()
export class UpdateReviewEvaluationInputType {
  @Field()
  evaluation?: number

  @Field()
  evaluatedBy!: { externalId: string }

  @Field()
  commentOn!: { externalId: string }

  constructor(builder: UpdateReviewEvaluationInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<UpdateReviewEvaluationInputTypeBuilder>,
  ): UpdateReviewEvaluationInputType {
    return new UpdateReviewEvaluationInputType({
      evaluation: other.evaluation ?? this.evaluation,
      evaluatedBy: other.evaluatedBy ?? this.evaluatedBy,
      commentOn: other.commentOn ?? this.commentOn,
    })
  }
}
