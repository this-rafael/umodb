import { Field, InputType } from '@nestjs/graphql'

export type UpdateOperatorInputTypeBuilder = {
  name?: string
  email?: string
  password?: string
}

@InputType()
export class UpdateOperatorInputType {
  @Field()
  public readonly name?: string

  @Field()
  public readonly email?: string

  @Field()
  public readonly password?: string

  constructor(builder: UpdateOperatorInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<UpdateOperatorInputTypeBuilder>,
  ): UpdateOperatorInputType {
    return new UpdateOperatorInputType({
      name: other.name ?? this.name,
      email: other.email ?? this.email,
      password: other.password ?? this.password,
    })
  }
}
