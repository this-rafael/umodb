import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type UpdateCommentOfReviewInputTypeBuilder = {
  content?: string
  review: { externalId: string }
  commentedBy: { externalId: string }
  commentOn: { externalId: string }
}

@InputType()
export class UpdateCommentOfReviewInputType {
  @Field()
  content?: string

  @Field(() => ExternalIdInputType)
  review!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  commentedBy!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  commentOn!: ExternalIdInputType

  constructor(builder: UpdateCommentOfReviewInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<UpdateCommentOfReviewInputTypeBuilder>,
  ): UpdateCommentOfReviewInputType {
    return new UpdateCommentOfReviewInputType({
      content: other.content ?? this.content,
      review: other.review ?? this.review,
      commentedBy: other.commentedBy ?? this.commentedBy,
      commentOn: other.commentOn ?? this.commentOn,
    })
  }
}
