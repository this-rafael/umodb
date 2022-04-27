import { Field, ObjectType } from '@nestjs/graphql'
import { ActorObjectType } from './actor.object-type'
import { MovieObjectType } from './movie.object-type'
import { OperatorObjectType } from './operator.object-type'

export type MoviesCastObjectTypeBuilder = {
  fkMovie: Partial<MovieObjectType> & { externalId: string }
  fkActor: Partial<ActorObjectType> & { externalId: string }
  addedBy: Partial<OperatorObjectType> & { externalId: string }
}

@ObjectType()
export class MoviesCastObjectType {
  @Field()
  public readonly fkMovie!: Partial<MovieObjectType> & { externalId: string }

  @Field()
  public readonly fkActor!: Partial<ActorObjectType> & { externalId: string }

  @Field()
  public readonly addedBy!: Partial<OperatorObjectType> & { externalId: string }

  constructor(builder: MoviesCastObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: Partial<MoviesCastObjectTypeBuilder>): MoviesCastObjectType {
    return new MoviesCastObjectType({
      fkMovie: other.fkMovie ?? this.fkMovie,
      fkActor: other.fkActor ?? this.fkActor,
      addedBy: other.addedBy ?? this.addedBy,
    })
  }
}
