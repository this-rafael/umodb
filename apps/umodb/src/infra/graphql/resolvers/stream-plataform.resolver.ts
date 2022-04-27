import { Query, Resolver, Mutation, Args } from '@nestjs/graphql'
import { CreateStreamPlataformInputType } from '../dtos/create-stream-plataform.input-type'
import { ExternalIdInputType } from '../dtos/external-id.input-type'
import { StreamPlataformObjectType } from '../dtos/stream-plataform.object-type'
import { UpdateStreamPlataformInputType } from '../dtos/update-stream-plataform.input-type'

@Resolver()
export class StreamPlataformResolver {
  @Mutation(() => StreamPlataformObjectType)
  async registerStreamPlataform(
    @Args('streamPlataform') streamPlataform: CreateStreamPlataformInputType,
  ): Promise<StreamPlataformObjectType> {
    console.log(streamPlataform)
    return new StreamPlataformObjectType({
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

  @Mutation(() => StreamPlataformObjectType)
  async addMovieOnStreamPlataform(
    @Args('moviesId') moviesId: ExternalIdInputType[],
    @Args('streamPlataformId') streamPlataformId: ExternalIdInputType,
  ): Promise<StreamPlataformObjectType> {
    console.log(streamPlataformId, moviesId)
    return new StreamPlataformObjectType({
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

  @Mutation(() => StreamPlataformObjectType)
  async removeMovieOnStreamPlataform(
    @Args('moviesId') moviesId: ExternalIdInputType[],
    @Args('streamPlataformId') streamPlataformId: ExternalIdInputType,
  ): Promise<StreamPlataformObjectType> {
    console.log(streamPlataformId, moviesId)
    return new StreamPlataformObjectType({
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

  @Query(() => StreamPlataformObjectType)
  async getOneStreamPlataform(
    @Args('addedBy') externalId: ExternalIdInputType,
  ): Promise<StreamPlataformObjectType> {
    console.log(externalId)
    return new StreamPlataformObjectType({
      catalog: [
        {
          externalId: '123',
          authorName: 'Aaa',
        },
      ],
      addedBy: { externalId: '123' },
      externalId: '123',
      createdAt: new Date(),
      name: 'Netflix',
      updatedAt: new Date(),
      editedBy: { externalId: '123' },
    })
  }
}
