// eslint-disable-next-line max-classes-per-file
import { Query, Args, Field, ObjectType, Resolver } from '@nestjs/graphql'

export type HasRegisteredObjectTypeBuilder = {
  registered: boolean
}

@ObjectType('HasRegisteredObjectType')
export class HasRegistered {
  @Field(() => Boolean, { nullable: false })
  public readonly registered!: boolean

  constructor(builder: HasRegisteredObjectTypeBuilder) {
    Object.assign(this, builder)
  }

  get toMap(): Map<string, unknown> {
    return new Map(Object.entries(this))
  }

  toString(): string {
    return `${this.toMap}`
  }

  copyWith(other: HasRegisteredObjectTypeBuilder): HasRegistered {
    return new HasRegistered({
      registered: other.registered ?? this.registered,
    })
  }
}

@Resolver()
export class OperatorResolver {
  @Query(() => HasRegistered)
  async emailHasRegistered(): Promise<HasRegistered> {
    return new HasRegistered({ registered: true })
  }
}
