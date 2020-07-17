import "reflect-metadata";
import { container } from './container'
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from './graphql'
import { IContextProvider, Type as ContextProviderType } from './helpers/context';

export default class Server {
  public start(): void {
    const context = ({ req }) => {
      const info = container.get<IContextProvider>(ContextProviderType);

      return Object.assign(info, { headers: req.headers })
    }

    const server = new ApolloServer({ context,  resolvers, typeDefs,  playground: true });

    const app = express();
    server.applyMiddleware({ app, path: '/graphql' });



    const port = parseInt(process.env.PORT, 10) || 6000;

    app.listen(port, () => console.log(`🚀 GraphQL is now running on http://localhost:${port}/graphql`));
  }
}

