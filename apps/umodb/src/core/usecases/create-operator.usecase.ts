import { Decorators } from '../../adapter/decorators/inject.decorator'
import { CreateOperatorModel } from '../models/create-operator.model'
import { OperatorModel } from '../models/operator.model'
import { CreateOperatorProtocol } from '../protocols/create-operator.protocol'
import { CreateOperatorStrategy } from '../strategies/create-operator.strategy'

@Decorators.Inject()
export class CreateOperatorUsecase implements CreateOperatorStrategy {
  constructor(
    private readonly createOperatorProtocol: CreateOperatorProtocol,
  ) {}

  async create(operator: CreateOperatorModel): Promise<OperatorModel> {
    return this.createOperatorProtocol.create(operator)
  }
}
