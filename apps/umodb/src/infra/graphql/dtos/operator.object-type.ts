import { Field, ObjectType } from '@nestjs/graphql'

export type OperatorObjectTypeBuilder = {
  externalId: string
  createdAt: Date
  updatedAt: Date
  name: string
  email: string
  password: string
}

@ObjectType()
export class OperatorObjectType {
  @Field()
  public readonly externalId!: string

  @Field()
  public readonly createdAt!: Date

  @Field()
  public readonly updatedAt!: Date

  @Field()
  public readonly name!: string

  @Field()
  public readonly email!: string

  @Field()
  public readonly password!: string

  constructor(builder: OperatorObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<OperatorObjectTypeBuilder>): OperatorObjectType {
    return new OperatorObjectType({
      externalId: other.externalId ?? this.externalId,
      createdAt: other.createdAt ?? this.createdAt,
      updatedAt: other.updatedAt ?? this.updatedAt,
      name: other.name ?? this.name,
      email: other.email ?? this.email,
      password: other.password ?? this.password,
    })
  }
}
