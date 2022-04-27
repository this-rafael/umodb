import { Field, ObjectType } from '@nestjs/graphql'
import { OperatorObjectType } from './operator.object-type'

export type MovieObjectTypeBuilder = {
  externalId: string
  createdAt: Date
  updatedAt: Date
  title: string
  authorName: string
  addedBy: Partial<OperatorObjectType> & { externalId: string }
  editedBy: Partial<OperatorObjectType> & { externalId: string }
}

@ObjectType()
export class MovieObjectType {
  @Field()
  public readonly externalId!: string

  @Field()
  public readonly createdAt!: Date

  @Field()
  public readonly updatedAt!: Date

  @Field()
  public readonly title!: string

  @Field()
  public readonly authorName!: string

  @Field(() => OperatorObjectType)
  public readonly addedBy!: Partial<OperatorObjectType> & { externalId: string }

  @Field(() => OperatorObjectType)
  public readonly editedBy!: Partial<OperatorObjectType> & {
    externalId: string
  }

  constructor(builder: MovieObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<MovieObjectTypeBuilder>): MovieObjectType {
    return new MovieObjectType({
      externalId: other.externalId ?? this.externalId,
      createdAt: other.createdAt ?? this.createdAt,
      updatedAt: other.updatedAt ?? this.updatedAt,
      title: other.title ?? this.title,
      authorName: other.authorName ?? this.authorName,
      addedBy: other.addedBy ?? this.addedBy,
      editedBy: other.editedBy ?? this.editedBy,
    })
  }
}
