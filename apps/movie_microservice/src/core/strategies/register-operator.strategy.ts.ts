import { CreateOperatorModel } from '../models/create-operator.model'

/**
 * @description
 * This class is responsible to define an contract called strategy to execute register operator usecase.
 */
export abstract class CreateOperatorStrategy {
  abstract call(operator: CreateOperatorModel): Promise<void>
}
