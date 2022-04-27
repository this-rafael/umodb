import { Field, ObjectType } from '@nestjs/graphql'
import { OperatorObjectType } from './operator.object-type'

export type ActorObjectTypeBuilder = {
  externalId: string
  createdAt: Date
  updatedAt: Date
  name: string
  birthday: Date
  addedBy: Partial<OperatorObjectType> & { externalId: string }
  editedBy: Partial<OperatorObjectType> & { externalId: string }
}

@ObjectType()
export class ActorObjectType {
  @Field()
  public readonly externalId!: string

  @Field()
  public readonly createdAt!: Date

  @Field()
  public readonly updatedAt!: Date

  @Field()
  public readonly birthday!: Date

  @Field()
  public readonly name!: string

  @Field(() => OperatorObjectType)
  public readonly addedBy!: Partial<OperatorObjectType> & { externalId: string }

  @Field(() => OperatorObjectType)
  public readonly editedBy!: Partial<OperatorObjectType> & {
    externalId: string
  }

  constructor(builder: ActorObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<ActorObjectTypeBuilder>): ActorObjectType {
    return new ActorObjectType({
      birthday: other.birthday ?? this.birthday,
      externalId: other.externalId ?? this.externalId,
      createdAt: other.createdAt ?? this.createdAt,
      updatedAt: other.updatedAt ?? this.updatedAt,
      name: other.name ?? this.name,
      addedBy: other.addedBy ?? this.addedBy,
      editedBy: other.editedBy ?? this.editedBy,
    })
  }
}
