import express from "express";
import { ApolloServer } from "apollo-server-express";
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolve, join, normalize } from 'path';
import { fileURLToPath } from 'url';

import { resolvers } from "./resolver.js";
import { connection } from "./connection.js";
import DeviceDataSource from "./dataSources/DeviceDataSource.js";

const port = 4000;

export async function serveGraphQl() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = resolve(__filename, '..');

  const schemaPath = normalize(join(__dirname, './schema/types/**/*.graphql'));

  const typeDefs = loadSchemaSync(schemaPath, {
    loaders: [new GraphQLFileLoader()]
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      deviceDataSource: new DeviceDataSource(connection),
    })
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port });

  console.log(
    `GraphQL server ready at http://localhost:${port}${server.graphqlPath}`
  );
}
