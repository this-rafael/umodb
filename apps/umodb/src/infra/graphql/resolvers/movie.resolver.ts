import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ActorReviewObjectType } from '../dtos/actor-review.object-type'
import { CreateMovieScoreInputType } from '../dtos/create-movie-score.input-type'
import { CreateMovieInputType } from '../dtos/create-movie.input-type'
import { ExternalIdInputType } from '../dtos/external-id.input-type'
import { FullMovieReviewObjectType } from '../dtos/full-movie-review.object-type'
import { MovieInfoByCustumerObjectType } from '../dtos/movie-info-by-customer.object-type'
import { MovieScoreObjectType } from '../dtos/movie-score.object-type'
import { MovieObjectType } from '../dtos/movie.object-type'
import { UpdateMovieScoreInputType } from '../dtos/update-movie-score.input-type'
import { UpdateMovieInputType } from '../dtos/update-movie.input-type'

@Resolver()
export class MovieResolver {
  @Mutation(() => MovieObjectType)
  async registerMovie(
    @Args('movie') movie: CreateMovieInputType,
  ): Promise<MovieObjectType> {
    console.log(movie)
    return new MovieObjectType({
      externalId: '123',
      addedBy: {
        externalId: '123',
        name: '',
        email: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      authorName: '',
      createdAt: new Date(),
      title: '',
      updatedAt: new Date(),
      editedBy: { externalId: '123' },
    })
  }

  @Mutation(() => MovieObjectType)
  async editMovie(
    @Args('movie') movie: UpdateMovieInputType,
  ): Promise<MovieObjectType> {
    console.log(movie)
    return new MovieObjectType({
      externalId: '123',
      addedBy: {
        externalId: '123',
        name: '',
        email: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      authorName: '',
      createdAt: new Date(),
      title: '',
      updatedAt: new Date(),
      editedBy: { externalId: '123' },
    })
  }

  @Query(() => MovieObjectType)
  async getOneMovie(
    @Args('addedBy') externalId: ExternalIdInputType,
  ): Promise<MovieObjectType> {
    console.log(externalId)
    return new MovieObjectType({
      externalId: '123',
      addedBy: {
        externalId: '123',
        name: '',
        email: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      authorName: '',
      createdAt: new Date(),
      title: '',
      updatedAt: new Date(),
      editedBy: { externalId: '123' },
    })
  }

  @Mutation(() => MovieScoreObjectType)
  async addScoreMovie(
    @Args('score') score: CreateMovieScoreInputType,
  ): Promise<MovieScoreObjectType> {
    console.log(score)

    return new MovieScoreObjectType({
      createdAt: new Date(),
      customer: {
        externalId: '123',
      },
      externalId: '123',
      movie: {
        externalId: '123',
      },
      score: 5,
      updatedAt: new Date(),
    })
  }

  @Mutation(() => MovieScoreObjectType)
  async editScoreMovie(
    @Args('score') score: UpdateMovieScoreInputType,
  ): Promise<MovieScoreObjectType> {
    console.log(score)

    return new MovieScoreObjectType({
      createdAt: new Date(),
      customer: {
        externalId: '123',
      },
      externalId: '123',
      movie: {
        externalId: '123',
      },
      score: 5,
      updatedAt: new Date(),
    })
  }

  @Query(() => [ActorReviewObjectType])
  async getActorsReview(
    @Args('movieId') movieId: ExternalIdInputType,
  ): Promise<ActorReviewObjectType[]> {
    console.log(movieId)

    return [
      new ActorReviewObjectType({
        actor: {
          externalId: '123',
        },
        movie: {
          externalId: '123',
        },
        review: 'adsadasda',
        reviewer: {
          externalId: '1',
        },
      }),
    ]
  }

  @Query(() => MovieInfoByCustumerObjectType)
  async getMovieInfoByCustomer(
    @Args('customerId') customerId: ExternalIdInputType,
  ): Promise<MovieInfoByCustumerObjectType> {
    console.log(customerId)

    return new MovieInfoByCustumerObjectType({
      customer: { externalId: '123' },
      movie: { externalId: '123' },
      isLoved: true,
      score: 1,
    })
  }

  @Query(() => [FullMovieReviewObjectType])
  async getFullMovieReview(
    @Args('movieId') movieId: ExternalIdInputType,
  ): Promise<FullMovieReviewObjectType[]> {
    console.log(movieId)

    return [
      new FullMovieReviewObjectType({
        movie: {
          externalId: '123',
        },
        createdAt: new Date(),
        externalId: '123',
        negativePoints: 'sdsadsaasd',
        positivePoints: 'sdsadsaasd',
        title: 'OLOLOLO',
        reviewDescription: 'xpto',
        updatedAt: new Date(),
        reviewer: {
          externalId: '1',
        },
      }),
    ]
  }
}
