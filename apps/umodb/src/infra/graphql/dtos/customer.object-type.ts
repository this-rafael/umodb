import { Field, ObjectType } from '@nestjs/graphql'

export type CustomerObjectTypeBuilder = {
  externalId: string
  createdAt: Date
  updatedAt: Date
  name: string
  email: string
  gender: string
  birthday: Date
}

@ObjectType()
export class CustomerObjectType {
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
  public readonly gender!: string

  @Field()
  public readonly birthday!: Date

  constructor(builder: CustomerObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<CustomerObjectTypeBuilder>): CustomerObjectType {
    return new CustomerObjectType({
      externalId: other.externalId ?? this.externalId,
      createdAt: other.createdAt ?? this.createdAt,
      updatedAt: other.updatedAt ?? this.updatedAt,
      name: other.name ?? this.name,
      email: other.email ?? this.email,
      gender: other.gender ?? this.gender,
      birthday: other.birthday ?? this.birthday,
    })
  }
}
