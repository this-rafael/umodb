import { CreateMovieModel } from '../models/create-movie.model'
import { MutationResultPromiseModel } from '../models/mutation-result-promise.model'

export abstract class CreateMovieStrategy {
  abstract create(
    movie: CreateMovieModel,
    subscriptionId: string,
  ): Promise<MutationResultPromiseModel>
}
