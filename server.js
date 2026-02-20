require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const connectDB = require("./config/db");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

connectDB();

const app = express();
app.use(graphqlUploadExpress());

async function startServer() {
  const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    return {
      message: err.message
    };
  }
});
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("Server running at http://localhost:4000/graphql")
  );
}

startServer();

