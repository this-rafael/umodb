import { Field, ObjectType } from '@nestjs/graphql'
import { MovieObjectType } from './movie.object-type'
import { OperatorObjectType } from './operator.object-type'
import { StreamPlataformObjectType } from './stream-plataform.object-type'

export type CatalogObjectTypeBuilder = {
  streamPlataform: Partial<StreamPlataformObjectType> & { externalId: string }
  movie: Partial<MovieObjectType> & { externalId: string }
  createdAt: Date
  updatedAt: Date
  addedBy: Partial<OperatorObjectType> & { externalId: string }
  editedBy: Partial<OperatorObjectType> & { externalId: string }
}

@ObjectType()
export class CatalogObjectType {
  @Field()
  public readonly streamPlataform!: Partial<StreamPlataformObjectType> & {
    externalId: string
  }

  @Field()
  public readonly movie!: Partial<MovieObjectType> & { externalId: string }

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
      streamPlataform: other.streamPlataform ?? this.streamPlataform,
      movie: other.movie ?? this.movie,
      createdAt: other.createdAt ?? this.createdAt,
      updatedAt: other.updatedAt ?? this.updatedAt,
      addedBy: other.addedBy ?? this.addedBy,
      editedBy: other.editedBy ?? this.editedBy,
    })
  }
}
