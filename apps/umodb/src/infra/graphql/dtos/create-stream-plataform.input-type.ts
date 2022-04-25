import { Field, InputType } from '@nestjs/graphql'

export type CreateStreamPlataformInputTypeBuilder = {
  name: string
  addedBy: { externalId: string }
}

@InputType()
export class CreateStreamPlataformInputType {
  @Field()
  public readonly name!: string

  @Field()
  public readonly addedBy!: { externalId: string }

  constructor(builder: CreateStreamPlataformInputTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateStreamPlataformInputTypeBuilder>,
  ): CreateStreamPlataformInputType {
    return new CreateStreamPlataformInputType({
      name: other.name ?? this.name,
      addedBy: other.addedBy ?? this.addedBy,
    })
  }
}
