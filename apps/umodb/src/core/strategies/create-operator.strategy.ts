import { CreateOperatorModel } from '../models/create-operator.model'
import { MutationResultPromiseModel } from '../models/mutation-result-promise.model'
import { OperatorModel } from '../models/operator.model'

/**
 * This abstraction represents a strategy to create an operator
 */
export abstract class CreateOperatorStrategy {
  /**
   * @description This method describe a common contract to create an operator
   * @param operator: CreateOperatorModel - The operator to create
   * @param subscriptionId: string - The subscription id
   * @param topic: Topic - The topic to publish the operator creation
   */
  abstract create(
    operator: CreateOperatorModel,
    subscriptionId: string,
    topic: string,
  ): Promise<MutationResultPromiseModel>
}
