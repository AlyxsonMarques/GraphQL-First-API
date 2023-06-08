import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "node:crypto";
/**
 * Através do template literal gql nós podemos definir nossos "types",
 * que são equivalentes a nossas rotas.
 */

/**
 * Schema-first-approach
 * Primeiro nós definimos os esquemas, depois implementamos (os resolvers)
 *
 * Code-first
 * Nosso schema é criado com base no nosso código
 */

const typeDefs = gql`
  type User {
    id: String
    name: String
    age: Int
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, age: Int!): User!
  }
`;

interface User {
  id: string;
  name: string;
  age: Number;
}

const users: User[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => {
        return users;
      },
    },

    Mutation: {
      createUser: (parent, args, context) => {
        const newUser = {
          id: randomUUID(),
          name: args.name,
          age: args.age,
        };
        users.push(newUser);

        return newUser;
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`running on ${url}`);
});
