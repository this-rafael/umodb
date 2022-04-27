import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type CreateMovieInputTypeBuilder = {
  title: string
  authorName: string
  addedBy: { externalId: string }
  addToPlataform: { externalId: string }
  movieCast: { externalId: string }[]
}

@InputType()
export class CreateMovieInputType {
  @Field()
  public readonly title!: string

  @Field()
  public readonly authorName!: string

  @Field(() => ExternalIdInputType)
  public readonly addedBy!: { externalId: string }

  @Field(() => ExternalIdInputType)
  public readonly addToPlataform!: { externalId: string }

  @Field(() => [ExternalIdInputType])
  public readonly movieCast!: { externalId: string }[]

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
      movieCast: other.movieCast ?? this.movieCast,
      addToPlataform: other.addToPlataform ?? this.addToPlataform,
      title: other.title ?? this.title,
      authorName: other.authorName ?? this.authorName,
      addedBy: other.addedBy ?? this.addedBy,
    })
  }
}
