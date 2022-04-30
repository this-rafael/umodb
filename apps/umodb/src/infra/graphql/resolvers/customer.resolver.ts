import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ActorReviewObjectType } from '../dtos/actor-review.object-type'
import { CommentOnReviewObjectType } from '../dtos/comment-of-review.object-type'
import { CreateActorReviewInput } from '../dtos/create-actor-review.input-type'
import { CreateBasicMovieReviewInputType } from '../dtos/create-basic-movie-review.input-type'
import { CreateCommentOfReviewInputType } from '../dtos/create-comment-of-review.input-type'
import { CreateCustomerInputType } from '../dtos/create-customer.input.type'
import { CreateLovedMoviesInputType } from '../dtos/create-loved-movies.input-type'
import { CustomerObjectType } from '../dtos/customer.object-type'
import { ExternalIdInputType } from '../dtos/external-id.input-type'
import { LovedMoviesObjectType } from '../dtos/loved-movies.object-type'
import { BasicReviewObjectType } from '../dtos/review.object-type'
import { UpdateActorInputType } from '../dtos/update-actor.input-type'
import { UpdateBasicMovieReviewInputType } from '../dtos/update-basic-movie-review.input-type'

@Resolver()
export class CustomerResolver {
  @Mutation(() => CustomerObjectType)
  async registerCustomer(
    @Args('customer') customer: CreateCustomerInputType,
  ): Promise<CustomerObjectType> {
    console.log(customer)
    return new CustomerObjectType({
      externalId: '123',
      birthday: new Date(),
      email: 'rafael@gmail.com',
      name: 'Rafael',
      gender: 'm',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  @Query(() => CustomerObjectType)
  async getOneCustomer(
    @Args('customerId') customerId: ExternalIdInputType,
  ): Promise<CustomerObjectType> {
    console.log(customerId)

    return new CustomerObjectType({
      externalId: '123',
      birthday: new Date(),
      email: 'rafael@gmail.com',
      name: 'Rafael',
      gender: 'm',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  @Mutation(() => LovedMoviesObjectType)
  async toggleLoveMovie(
    @Args('loveMovie') loveMovie: CreateLovedMoviesInputType,
  ): Promise<LovedMoviesObjectType> {
    console.log(loveMovie)

    return new LovedMoviesObjectType({
      lovedBy: {
        externalId: '123',
      },
      deleted: true,
      externalId: '123',
      movie: {
        externalId: '123',
      },
    })
  }

  @Mutation(() => ActorReviewObjectType)
  async editActorReview(
    @Args('review') review: CreateActorReviewInput,
  ): Promise<ActorReviewObjectType> {
    console.log(review)

    return new ActorReviewObjectType({
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
    })
  }

  @Mutation(() => ActorReviewObjectType)
  async addActorReview(
    @Args('review') review: UpdateActorInputType,
  ): Promise<ActorReviewObjectType> {
    console.log(review)

    return new ActorReviewObjectType({
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
    })
  }

  @Mutation(() => BasicReviewObjectType)
  async addMovieReview(
    @Args('review') review: CreateBasicMovieReviewInputType,
  ): Promise<BasicReviewObjectType> {
    console.log(review)

    return new BasicReviewObjectType({
      externalId: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Rafael',
      description: 'Rafael',
      customer: {
        externalId: '123',
      },
      movie: {
        externalId: '123',
      },
    })
  }

  @Mutation(() => BasicReviewObjectType)
  async editMovieReview(
    @Args('review') review: UpdateBasicMovieReviewInputType,
  ): Promise<BasicReviewObjectType> {
    console.log(review)

    return new BasicReviewObjectType({
      externalId: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Rafael',
      description: 'Rafael',
      customer: {
        externalId: '123',
      },
      movie: {
        externalId: '123',
      },
    })
  }

  @Mutation(() => BasicReviewObjectType)
  async commentMovieReview(
    @Args('commend') review: CreateCommentOfReviewInputType,
  ): Promise<CommentOnReviewObjectType> {
    console.log(review)

    return new CommentOnReviewObjectType({
      externalId: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Rafael',
      commentOn: {
        externalId: '123',
      },
      commentedBy: {
        externalId: '123',
      },
      description: 'Rafael',
    })
  }
}
