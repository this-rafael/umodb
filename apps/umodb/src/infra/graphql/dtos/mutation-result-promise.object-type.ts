import { Field, ObjectType } from '@nestjs/graphql'
import { MutationResultPromiseModel } from '../../../core/models/mutation-result-promise.model'

@ObjectType()
export class MutationResultPromiseObjectType {
  @Field()
  public readonly expectedResultAt!: Date

  @Field()
  public readonly createdAt!: Date

  constructor(builder: MutationResultPromiseModel) {
    Object.assign(this, builder)
  }
}
