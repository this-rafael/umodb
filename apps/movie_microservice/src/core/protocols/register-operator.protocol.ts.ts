import { CreateOperatorModel } from '../models/create-operator.model'
import { OperatorModel } from '../models/operator.model'

/**
 * @description
 * This class is responsible to define an infra layer protocol to register an operator.
 */
export abstract class RegisterOperatorProtocol {
  abstract call(operator: CreateOperatorModel): Promise<OperatorModel>
}
