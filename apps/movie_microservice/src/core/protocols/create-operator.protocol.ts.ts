import { CreateOperatorModel } from '../models/create-operator.model'
import { OperatorModel } from '../models/operator.model'

export abstract class CreateOperatorProtocol {
  abstract call(operator: CreateOperatorModel): Promise<OperatorModel>
}
