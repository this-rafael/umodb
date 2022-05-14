import { Field, InputType } from '@nestjs/graphql'
import { CreateMovieModel } from '../../../core/models/create-movie.model'
import { ExternalIdInputType } from './external-id.input-type'

@InputType()
export class CreateMovieInputType {
  @Field()
  public readonly title!: string

  @Field()
  public readonly authorName!: string

  @Field(() => ExternalIdInputType)
  public readonly addedBy!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  public readonly addToPlataform!: ExternalIdInputType

  @Field(() => [ExternalIdInputType])
  public readonly movieCast!: ExternalIdInputType[]

  constructor(builder: CreateMovieModel) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<CreateMovieModel>): CreateMovieInputType {
    return new CreateMovieInputType({
      movieCast: other.movieCast ?? this.movieCast,
      addToPlataform: other.addToPlataform ?? this.addToPlataform,
      title: other.title ?? this.title,
      authorName: other.authorName ?? this.authorName,
      addedBy: other.addedBy ?? this.addedBy,
    })
  }
}
