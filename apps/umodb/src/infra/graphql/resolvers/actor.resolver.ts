import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ActorObjectType } from '../dtos/actor.object-type'
import { CreateActorInputType } from '../dtos/create-actor.input-type'
import { ExternalIdInputType } from '../dtos/external-id.input-type'
import { UpdateActorInputType } from '../dtos/update-actor.input-type'

@Resolver()
export class ActorResolver {
  @Mutation(() => ActorObjectType)
  async registerActor(
    @Args('actor') actor: CreateActorInputType,
  ): Promise<ActorObjectType> {
    console.log(actor)
    return new ActorObjectType({
      birthday: new Date(),
      externalId: '123',
      addedBy: {
        externalId: '123',
        name: '',
        email: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      name: '',
      updatedAt: new Date(),
      editedBy: { externalId: '123' },
    })
  }

  @Mutation(() => ActorObjectType)
  async editActor(
    @Args('actor') actor: UpdateActorInputType,
  ): Promise<ActorObjectType> {
    console.log(actor)
    return new ActorObjectType({
      birthday: new Date(),
      externalId: '123',
      addedBy: {
        externalId: '123',
        name: 'Fulano',
        email: 'rafael@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      name: '',
      updatedAt: new Date(),
      editedBy: { externalId: '123' },
    })
  }

  @Query(() => ActorObjectType)
  async getOneActor(
    @Args('addedBy') externalId: ExternalIdInputType,
  ): Promise<ActorObjectType> {
    console.log(externalId)
    return new ActorObjectType({
      birthday: new Date(),
      externalId: '123',
      addedBy: {
        externalId: '123',
        name: 'Fulano',
        email: 'rafael@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      name: '',
      updatedAt: new Date(),
      editedBy: { externalId: '123' },
    })
  }
}
