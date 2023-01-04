const fs = require("fs");
const neo4j = require("neo4j-driver");
const { makeAugmentedSchema } = require("neo4j-graphql-js");
const { ApolloServer } = require("apollo-server");
require("dotenv").config({ path: __dirname + "/../../.env" });

// const inferAugmentedSchema = driver => {
//   return inferSchema(driver).then(result => {
//     return makeAugmentedSchema({
//       typeDefs: result.typeDefs
//     });
//   });
// };

// const persistInferredSchema = driver => {
//   const schemaInferenceOptions = {
//     alwaysIncludeRelationships: false
//   };
//   
//   return inferSchema(driver, schemaInferenceOptions).then((result) => {
//     fs.writeFile("schema.graphql", result.typeDefs, (err) => {
//       if (err) throw err;
//       console.log("Updated schema.graphql");
//       process.exit(0);
//     });
//   });
// }

const driver = neo4j.driver(
  `${process.env.DB_HOST}:${process.env.DB_PORT}`,
  neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASSWORD)
);

const typeDefs = fs
  .readFileSync(__dirname + "/schema.graphql")
  .toString("utf-8");

const schema = makeAugmentedSchema({ typeDefs });

const server = new ApolloServer({
  schema,
  context: { driver },
});

server.listen(3003, "0.0.0.0").then(({ url }) => {
  console.log(`GraphQL API ready at ${url}`);
});
