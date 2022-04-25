import { Field, InputType } from '@nestjs/graphql'
import { OperatorObjectType } from './operator.object-type'

export type CreateActorInputTypeBuilder = {
  name: string
  birthday: Date
  addedBy: { externalId: string }
}

@InputType()
export class CreateActorInputType {
  @Field()
  public readonly name!: string

  @Field()
  public readonly birthday!: Date

  @Field()
  public readonly addedBy!: { externalId: string }

  constructor(builder: CreateActorInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<CreateActorInputTypeBuilder>): CreateActorInputType {
    return new CreateActorInputType({
      name: other.name ?? this.name,
      birthday: other.birthday ?? this.birthday,
      addedBy: other.addedBy ?? this.addedBy,
    })
  }
}
