import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ActorReviewObjectType } from '../dtos/actor-review.object-type'
import { CreateActorReviewInput } from '../dtos/create-actor-review.input-type'
import { CreateCustomerInputType } from '../dtos/create-customer.input.type'
import { CreateLovedMoviesInputType } from '../dtos/create-loved-movies.input-type'

import { CustomerObjectType } from '../dtos/customer.object-type'
import { ExternalIdInputType } from '../dtos/external-id.input-type'
import { LovedMoviesObjectType } from '../dtos/loved-movies.object-type'
import { MovieInfoByCustumerObjectType } from '../dtos/movie-info-by-customer.object-type'
import { UpdateActorInputType } from '../dtos/update-actor.input-type'

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
}
