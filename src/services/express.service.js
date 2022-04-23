require("dotenv").config();
const express = require("express");
const apiRouter = require("../routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const ParkingSchema = require("../apollo/schemas/parking.schema");
const FloorSchema = require("../apollo/schemas/floor.schema");
const SpotSchema = require("../apollo/schemas/spot.schema");

const parkingResolvers = require("../apollo/resolvers/parking.resolver");
const floorResolvers = require("../apollo/resolvers/floor.resolver");
const spotResolvers = require("../apollo/resolvers/spot.resolver");


const app = express();

const graphQlServer = new ApolloServer({
  typeDefs: [
    ParkingSchema,
    FloorSchema,
    SpotSchema
  ],
  resolvers: [
    parkingResolvers,
    floorResolvers,
    spotResolvers
  ],
});

graphQlServer.applyMiddleware({ app, path: "/graphql" });
// app.use(bodyParser.json());
app.use("*", cors());

app.use(function (req, res, next) {
  express.json()(req, res, next);
});
app.use("/api/v1", apiRouter);

exports.start = () => {
  const port = process.env.PORT;

  app.listen(port, (err) => {
    if (err) {
      process.exit(-1);
    }
    console.log(`Application écoutant sur : http://localhost:${port}`);
  });
};
