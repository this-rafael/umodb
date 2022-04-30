import { Field, InputType } from '@nestjs/graphql'
import { ExternalIdInputType } from './external-id.input-type'

export type CreateCatalogObjectTypeBuilder = {
  fkStreamPlataform: { externalId: string }
  fkMovie: { externalId: string }
  addedBy: { externalId: string }
}

@InputType()
export class CreateCatalogObjectType {
  @Field(() => ExternalIdInputType)
  public readonly streamPlataformId!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  public readonly movieId!: ExternalIdInputType

  @Field(() => ExternalIdInputType)
  public readonly addedBy!: ExternalIdInputType

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
      fkStreamPlataform: other.fkStreamPlataform ?? this.streamPlataformId,
      fkMovie: other.fkMovie ?? this.movieId,
      addedBy: other.addedBy ?? this.addedBy,
    })
  }
}
