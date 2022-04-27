import { Field, ObjectType } from '@nestjs/graphql'
import { MovieObjectType } from './movie.object-type'
import { OperatorObjectType } from './operator.object-type'
import { StreamPlataformObjectType } from './stream-plataform.object-type'

export type CatalogObjectTypeBuilder = {
  fkStreamPlataform: Partial<StreamPlataformObjectType> & { externalId: string }
  fkMovie: Partial<MovieObjectType> & { externalId: string }
  createdAt: Date
  updatedAt: Date
  addedBy: Partial<OperatorObjectType> & { externalId: string }
  editedBy: Partial<OperatorObjectType> & { externalId: string }
}

@ObjectType()
export class CatalogObjectType {
  @Field()
  public readonly fkStreamPlataform!: Partial<StreamPlataformObjectType> & {
    externalId: string
  }

  @Field()
  public readonly fkMovie!: Partial<MovieObjectType> & { externalId: string }

  @Field()
  public readonly createdAt!: Date

  @Field()
  public readonly updatedAt!: Date

  @Field()
  public readonly addedBy!: Partial<OperatorObjectType> & { externalId: string }

  @Field()
  public readonly editedBy!: Partial<OperatorObjectType> & {
    externalId: string
  }

  constructor(builder: CatalogObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<CatalogObjectTypeBuilder>): CatalogObjectType {
    return new CatalogObjectType({
      fkStreamPlataform: other.fkStreamPlataform ?? this.fkStreamPlataform,
      fkMovie: other.fkMovie ?? this.fkMovie,
      createdAt: other.createdAt ?? this.createdAt,
      updatedAt: other.updatedAt ?? this.updatedAt,
      addedBy: other.addedBy ?? this.addedBy,
      editedBy: other.editedBy ?? this.editedBy,
    })
  }
}
