import { Field, ObjectType } from '@nestjs/graphql'

export type ReviewerObjectTypeBuilder = {
  externalId: string
  createdAt: Date
  updatedAt: Date
  name: string
}

@ObjectType()
export class ReviewerObjectType {
  @Field()
  public readonly externalId!: string

  @Field()
  public readonly createdAt!: Date

  @Field()
  public readonly updatedAt!: Date

  @Field()
  public readonly name!: string

  constructor(builder: ReviewerObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<ReviewerObjectTypeBuilder>): ReviewerObjectType {
    return new ReviewerObjectType({
      externalId: other.externalId ?? this.externalId,
      createdAt: other.createdAt ?? this.createdAt,
      updatedAt: other.updatedAt ?? this.updatedAt,
      name: other.name ?? this.name,
    })
  }
}
