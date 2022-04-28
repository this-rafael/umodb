import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateMovieScoreInputType } from '../dtos/create-movie-score.input-type'
import { CreateMovieInputType } from '../dtos/create-movie.input-type'
import { ExternalIdInputType } from '../dtos/external-id.input-type'
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

  @Mutation()
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

  @Mutation()
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
}
