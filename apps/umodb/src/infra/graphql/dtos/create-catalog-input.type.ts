import { Field, InputType } from '@nestjs/graphql'

export type CreateCatalogObjectTypeBuilder = {
  fkStreamPlataform: { externalId: string }
  fkMovie: { externalId: string }
  addedBy: { externalId: string }
}

@InputType()
export class CreateCatalogObjectType {
  @Field()
  public readonly fkStreamPlataform!: { externalId: string }

  @Field()
  public readonly fkMovie!: { externalId: string }

  @Field()
  public readonly addedBy!: { externalId: string }

  constructor(builder: CreateCatalogObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(
    other: Partial<CreateCatalogObjectTypeBuilder>,
  ): CreateCatalogObjectType {
    return new CreateCatalogObjectType({
      fkStreamPlataform: other.fkStreamPlataform ?? this.fkStreamPlataform,
      fkMovie: other.fkMovie ?? this.fkMovie,
      addedBy: other.addedBy ?? this.addedBy,
    })
  }
}
