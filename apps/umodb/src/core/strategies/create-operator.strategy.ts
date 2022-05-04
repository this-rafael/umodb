import { CreateOperatorModel } from '../models/create-operator.model'
import { OperatorModel } from '../models/operator.model'

export abstract class CreateOperatorStrategy {
  abstract create(operator: CreateOperatorModel): Promise<OperatorModel>
}
