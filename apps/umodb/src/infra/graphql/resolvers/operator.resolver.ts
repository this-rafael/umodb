import { Query, Args, Mutation, Resolver } from '@nestjs/graphql'
import { OperatorService } from '../../../adapter/service/operator.service'
import { CreateOperatorInputType } from '../dtos/create-operator.input-type'
import { ExternalIdInputType } from '../dtos/external-id.input-type'
import { OperatorObjectType } from '../dtos/operator.object-type'

@Resolver()
export class OperatorResolver {
  constructor(private readonly operatorService: OperatorService) {}

  @Mutation(() => OperatorObjectType)
  async registerOperator(
    @Args('operator') operator: CreateOperatorInputType,
  ): Promise<OperatorObjectType> {
    console.log(operator)

    return this.operatorService.registerOperator(operator)
  }

  @Query(() => OperatorObjectType)
  async getOneOperator(
    @Args('externalId') externalId: ExternalIdInputType,
  ): Promise<OperatorObjectType> {
    console.log(externalId)
    return new OperatorObjectType({
      externalId: '123',
      name: '',
      password: '',
      email: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}
