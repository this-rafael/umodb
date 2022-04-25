import { Field, InputType } from '@nestjs/graphql'

export type UpdateStreamPlataformInputTypeBuilder = {
  name: string
  editedBy: { externalId: string }
}

@InputType()
export class UpdateStreamPlataformInputType {
  @Field()
  public readonly name!: string

  @Field()
  public readonly editedBy!: { externalId: string }

  constructor(builder: UpdateStreamPlataformInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<UpdateStreamPlataformInputTypeBuilder>,
  ): UpdateStreamPlataformInputType {
    return new UpdateStreamPlataformInputType({
      name: other.name ?? this.name,
      editedBy: other.editedBy ?? this.editedBy,
    })
  }
}
