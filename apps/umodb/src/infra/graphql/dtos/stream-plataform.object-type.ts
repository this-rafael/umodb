import { Field, ObjectType } from '@nestjs/graphql'
import { OperatorObjectType } from './operator.object-type'

export type StreamPlataformObjectTypeBuilder = {
  externalId: string
  createdAt: Date
  updatedAt: Date
  name: string
  addedBy: Partial<OperatorObjectType> & { externalId: string }
  editedBy: Partial<OperatorObjectType> & { externalId: string }
}

@ObjectType()
export class StreamPlataformObjectType {
  @Field()
  public readonly externalId!: string

  @Field()
  public readonly createdAt!: Date

  @Field()
  public readonly updatedAt!: Date

  @Field()
  public readonly name!: string

  @Field()
  public readonly addedBy!: Partial<OperatorObjectType> & { externalId: string }

  @Field()
  public readonly editedBy!: Partial<OperatorObjectType> & {
    externalId: string
  }

  constructor(builder: StreamPlataformObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<StreamPlataformObjectTypeBuilder>,
  ): StreamPlataformObjectType {
    return new StreamPlataformObjectType({
      externalId: other.externalId ?? this.externalId,
      createdAt: other.createdAt ?? this.createdAt,
      updatedAt: other.updatedAt ?? this.updatedAt,
      name: other.name ?? this.name,
      addedBy: other.addedBy ?? this.addedBy,
      editedBy: other.editedBy ?? this.editedBy,
    })
  }
}
