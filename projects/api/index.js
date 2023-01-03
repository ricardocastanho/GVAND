const { makeAugmentedSchema } = require("neo4j-graphql-js");
const neo4j = require("neo4j-driver");
const { ApolloServer } = require("apollo-server");
require("dotenv").config({ path: __dirname + "/../../.env" });

const typeDefs = `
  type Movie {
    _id: Long!
    countries: [String]
    imdbId: String!
    imdbRating: Float
    imdbVotes: Int
    languages: [String]
    movieId: String!
    plot: String
    poster: String
    released: String
    runtime: Int
    title: String!
    tmdbId: String
    year: Int
    in_genre: [Genre] @relation(name: "IN_GENRE", direction: OUT)
    users: [User] @relation(name: "RATED", direction: IN)
    actors: [Actor] @relation(name: "ACTED_IN", direction: IN)
    directors: [Director] @relation(name: "DIRECTED", direction: IN)
  }

  type RATED @relation(name: "RATED") {
    from: User!
    to: Movie!
    created: DateTime!
    rating: Float!
    timestamp: Int!
  }

  type User {
    _id: Long!
    name: String!
    userId: String!
    rated: [Movie] @relation(name: "RATED", direction: OUT)
    RATED_rel: [RATED]
  }

  type Actor {
    _id: Long!
    name: String!
    acted_in: [Movie] @relation(name: "ACTED_IN", direction: OUT)
  }

  type Director {
    _id: Long!
    name: String!
    directed: [Movie] @relation(name: "DIRECTED", direction: OUT)
  }

  type Genre {
    _id: Long!
    name: String!
    movies: [Movie] @relation(name: "IN_GENRE", direction: IN)
  }
`;

const schema = makeAugmentedSchema({ typeDefs });

const driver = neo4j.driver(
  `${process.env.DB_HOST}:${process.env.DB_PORT}`,
  neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASSWORD)
);

const server = new ApolloServer({ schema, context: { driver } });

server.listen(3003, "0.0.0.0").then(({ url }) => {
  console.log(`GraphQL API ready at ${url}`);
});
