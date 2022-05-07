import { Field, ObjectType } from '@nestjs/graphql'
import { OperatorModel } from '../../../core/models/operator.model'

@ObjectType()
export class OperatorObjectType {
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

  constructor(builder: OperatorModel) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<OperatorModel>): OperatorObjectType {
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
