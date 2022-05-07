import { CreateOperatorModel } from '../models/create-operator.model'
import { MutationResultPromiseModel } from '../models/mutation-result-promise.model'
import { OperatorModel } from '../models/operator.model'

export abstract class CreateOperatorStrategy {
  abstract create(
    operator: CreateOperatorModel,
    subscriptionId: string,
    topic: string,
  ): Promise<MutationResultPromiseModel>
}
