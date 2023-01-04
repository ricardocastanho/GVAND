const { makeAugmentedSchema, inferSchema } = require("neo4j-graphql-js");
const neo4j = require("neo4j-driver");
const { ApolloServer } = require("apollo-server");
require("dotenv").config({ path: __dirname + "/../../.env" });

const driver = neo4j.driver(
  `${process.env.DB_HOST}:${process.env.DB_PORT}`,
  neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASSWORD)
);

const inferAugmentedSchema = driver => {
  return inferSchema(driver).then(result => {
    return makeAugmentedSchema({
      typeDefs: result.typeDefs
    });
  });
};

const createServer = schema => {
  return new ApolloServer({
    schema,
    context: { driver }
  });
};

inferAugmentedSchema(driver)
  .then(createServer)
  .then(server => server.listen(3003, '0.0.0.0'))
  .then(({ url }) => {
    console.log(`GraphQL API ready at ${url}`);
  })
  .catch(err => console.error(err));
