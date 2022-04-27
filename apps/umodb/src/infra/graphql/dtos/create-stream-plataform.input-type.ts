import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type CreateStreamPlataformInputTypeBuilder = {
  name: string
  addedBy: { externalId: string }
  catalog: { externalId: string }[]
}

@InputType()
export class CreateStreamPlataformInputType {
  @Field()
  public readonly name!: string

  @Field(() => ExternalIdInputType)
  public readonly addedBy!: ExternalIdInputType

  @Field(() => [ExternalIdInputType])
  public readonly catalog!: ExternalIdInputType[]

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
      catalog: other.catalog ?? this.catalog,
      name: other.name ?? this.name,
      addedBy: other.addedBy ?? this.addedBy,
    })
  }
}
