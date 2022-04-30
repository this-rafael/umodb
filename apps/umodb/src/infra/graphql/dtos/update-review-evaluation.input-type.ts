import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type UpdateReviewEvaluationInputTypeBuilder = {
  evaluation?: number
  evaluatedBy: { externalId: string }
  commentOn: { externalId: string }
}

@InputType()
export class UpdateReviewEvaluationInputType {
  @Field()
  evaluation?: number

  @Field(() => ExternalIdInputType)
  evaluatedBy!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  commentOn!: ExternalIdInputType

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
