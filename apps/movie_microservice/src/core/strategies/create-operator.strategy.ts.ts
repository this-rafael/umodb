import { CreateOperatorModel } from '../models/create-operator.model'

export abstract class CreateOperatorStrategy {
  abstract call(operator: CreateOperatorModel): Promise<void>
}
