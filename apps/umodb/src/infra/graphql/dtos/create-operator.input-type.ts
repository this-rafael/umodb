import { Field, InputType } from '@nestjs/graphql'

export type CreateOperatorInputTypeBuilder = {
  name: string
  email: string
  password: string
}

@InputType()
export class CreateOperatorInputType {
  @Field()
  public readonly internalId!: number

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

  constructor(builder: CreateOperatorInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateOperatorInputTypeBuilder>,
  ): CreateOperatorInputType {
    return new CreateOperatorInputType({
      name: other.name ?? this.name,
      email: other.email ?? this.email,
      password: other.password ?? this.password,
    })
  }
}
