import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type CreateReviewEvaluationInputTypeBuilder = {
  evaluation: number
  evaluatedBy: { externalId: string }
  commentOn: { externalId: string }
}

@InputType()
export class CreateReviewEvaluationInputType {
  @Field()
  evaluation!: number

  @Field(() => ExternalIdInputType)
  evaluatedBy!: ExternalIdInputType

  @Field()
  commentOn!: ExternalIdInputType

  constructor(builder: CreateReviewEvaluationInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateReviewEvaluationInputTypeBuilder>,
  ): CreateReviewEvaluationInputType {
    return new CreateReviewEvaluationInputType({
      evaluation: other.evaluation ?? this.evaluation,
      evaluatedBy: other.evaluatedBy ?? this.evaluatedBy,
      commentOn: other.commentOn ?? this.commentOn,
    })
  }
}
