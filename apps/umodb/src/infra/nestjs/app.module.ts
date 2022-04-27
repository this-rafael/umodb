import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import * as path from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { OperatorResolver } from '../graphql/resolvers/operator.resolver'
import { MovieResolver } from '../graphql/resolvers/movie.resolver'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'apps/umodb/src/schema.gql'),
      context: ({ req, connection }) => {
        return connection
          ? {
              req: connection.context,
            }
          : {
              req,
            }
      },
      debug: true,
      playground: true,
      disableHealthCheck: true,
      cors: {
        credentials: true,
        origin: true,
      },
    }),
  ],
  providers: [OperatorResolver, MovieResolver],
})
export class AppModule {}
