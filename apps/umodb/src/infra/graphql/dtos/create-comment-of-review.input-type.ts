import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type CreateCommentOfReviewInputTypeBuilder = {
  content: string
  review: { externalId: string }
  commentedBy: { externalId: string }
  commentOn: { externalId: string }
}

@InputType()
export class CreateCommentOfReviewInputType {
  @Field()
  content!: string

  @Field(() => ExternalIdInputType)
  review!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  commentedBy!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  commentOn!: ExternalIdInputType

  constructor(builder: CreateCommentOfReviewInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateCommentOfReviewInputTypeBuilder>,
  ): CreateCommentOfReviewInputType {
    return new CreateCommentOfReviewInputType({
      content: other.content ?? this.content,
      review: other.review ?? this.review,
      commentedBy: other.commentedBy ?? this.commentedBy,
      commentOn: other.commentOn ?? this.commentOn,
    })
  }
}
