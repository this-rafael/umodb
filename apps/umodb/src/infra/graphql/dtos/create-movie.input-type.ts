import { Field, InputType } from '@nestjs/graphql'

export type CreateMovieInputTypeBuilder = {
  title: string
  authorName: string
  addedBy: { externalId: string }
}

@InputType()
export class CreateMovieInputType {
  @Field()
  public readonly title!: string

  @Field()
  public readonly authorName!: string

  @Field()
  public readonly addedBy!: { externalId: string }

  constructor(builder: CreateMovieInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<CreateMovieInputTypeBuilder>): CreateMovieInputType {
    return new CreateMovieInputType({
      title: other.title ?? this.title,
      authorName: other.authorName ?? this.authorName,
      addedBy: other.addedBy ?? this.addedBy,
    })
  }
}
