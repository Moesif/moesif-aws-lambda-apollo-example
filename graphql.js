const { ApolloServer, gql } = require('apollo-server-lambda');
const moesif = require('moesif-aws-lambda');
const https = require('https');
console.log('Loading function');

const moesifOptions = {

  applicationId: process.env.MOESIF_APPLICATION_ID,

  identifyUser: function (event, context) {
      return event.requestContext && event.requestContext.identity && event.requestContext.identity.cognitoIdentityId
  }
};

var moesifMiddleware = moesif(moesifOptions);
moesifMiddleware.startCaptureOutgoing();

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
# Comments in GraphQL are defined with the hash (#) symbol.

# This "Book" type can be used in other type declarations.
type Book {
  title: String
  author: String
}

# The "Query" type is the root of all GraphQL queries.
# (A "Mutation" type will be covered later on.)
type Query {
  books: [Book]
}
`;
 
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    books: () => books,
  },
};
 
const server = new ApolloServer({
  typeDefs,
  resolvers,

  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler();

exports.handler = moesif(moesifOptions, exports.handler);
