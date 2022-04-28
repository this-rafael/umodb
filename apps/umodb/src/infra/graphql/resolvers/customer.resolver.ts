import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateCustomerInputType } from '../dtos/create-customer.input.type'
import { CreateLovedMoviesInputType } from '../dtos/create-loved-movies.input-type'

import { CustomerObjectType } from '../dtos/customer.object-type'
import { ExternalIdInputType } from '../dtos/external-id.input-type'
import { LovedMoviesObjectType } from '../dtos/loved-movies.object-type'
import { MovieInfoByCustumerObjectType } from '../dtos/movie-info-by-customer.object-type'

@Resolver()
export class CustomerResolver {
  @Mutation()
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

  @Query()
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

  @Mutation()
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

  @Query()
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
}
