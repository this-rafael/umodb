import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type UpdateActorInputTypeBuilder = {
  name?: string
  birthday?: Date
  editedBy: { externalId: string }
}

@InputType()
export class UpdateActorInputType {
  @Field()
  public readonly name?: string

  @Field()
  public readonly birthday?: Date

  @Field(() => ExternalIdInputType)
  public readonly editedBy!: { externalId: string }

  constructor(builder: UpdateActorInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<UpdateActorInputTypeBuilder>): UpdateActorInputType {
    return new UpdateActorInputType({
      name: other.name ?? this.name,
      birthday: other.birthday ?? this.birthday,
      editedBy: other.editedBy ?? this.editedBy,
    })
  }
}
