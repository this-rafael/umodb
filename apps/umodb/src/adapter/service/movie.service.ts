import { Decorators } from '../../../../movie_microservice/src/adapter/decorators/inject.decorator'
import { CreateMovieStrategy } from '../../core/strategies/create-movie.strategy'
import { CreateMovieInputType } from '../../infra/graphql/dtos/create-movie.input-type'
import { MutationResultPromiseObjectType } from '../../infra/graphql/dtos/mutation-result-promise.object-type'

@Decorators.Inject()
export class MovieService {
  constructor(private readonly createMovieStrategy: CreateMovieStrategy) {}

  async registerMovie(
    movie: CreateMovieInputType,
    subscriptionId: string,
  ): Promise<MutationResultPromiseObjectType> {
    const model = await this.createMovieStrategy.create(movie, subscriptionId)

    return new MutationResultPromiseObjectType(model)
  }
}
