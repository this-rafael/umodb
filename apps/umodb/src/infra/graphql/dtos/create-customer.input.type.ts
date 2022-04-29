import { Field, InputType } from '@nestjs/graphql'

export type CreateCustomerInputTypeBuilder = {
  name: string
  email: string
  password: string
  gender: string
  birthday: Date
}

@InputType()
export class CreateCustomerInputType {
  @Field()
  public readonly name!: string

  @Field()
  public readonly email!: string

  @Field()
  public readonly password!: string

  @Field()
  public readonly gender!: string

  @Field()
  public readonly birthday!: Date

  constructor(builder: CreateCustomerInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateCustomerInputTypeBuilder>,
  ): CreateCustomerInputType {
    return new CreateCustomerInputType({
      name: other.name ?? this.name,
      email: other.email ?? this.email,
      password: other.password ?? this.password,
      birthday: other.birthday ?? this.birthday,
      gender: other.gender ?? this.gender,
    })
  }
}
