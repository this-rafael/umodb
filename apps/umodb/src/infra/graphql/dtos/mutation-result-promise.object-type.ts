import { Field, ObjectType } from '@nestjs/graphql'
import { MutationResultPromiseModel } from '../../../core/models/mutation-result-promise.model'

@ObjectType({
  description: 'This object represents a promise of creating a generic object',
})
export class MutationResultPromiseObjectType {
  @Field({
    description:
      'This field mark the max time of waiting of the creation result',
  })
  public readonly expectedResultAt!: Date

  @Field({
    description: 'This field mark the timestamp of creation',
  })
  public readonly createdAt!: Date

  constructor(builder: MutationResultPromiseModel) {
    Object.assign(this, builder)
  }
}
