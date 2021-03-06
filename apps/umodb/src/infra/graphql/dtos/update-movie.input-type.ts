import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type UpdateMovieInputTypeBuilder = {
  externalId: string
  title?: string
  authorName?: string
  editedBy: { externalId: string }
}

@InputType()
export class UpdateMovieInputType {
  @Field()
  public readonly externalId!: string

  @Field()
  public readonly title?: string

  @Field()
  public readonly authorName?: string

  @Field(() => ExternalIdInputType)
  public readonly editedBy!: ExternalIdInputType

  constructor(builder: UpdateMovieInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<UpdateMovieInputTypeBuilder>): UpdateMovieInputType {
    return new UpdateMovieInputType({
      externalId: other.externalId ?? this.externalId,
      title: other.title ?? this.title,
      authorName: other.authorName ?? this.authorName,
      editedBy: other.editedBy ?? this.editedBy,
    })
  }
}
