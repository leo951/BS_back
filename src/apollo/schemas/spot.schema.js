const { gql } = require("apollo-server-express");

module.exports = gql`
  type Spot {
    id: ID
    number: String
    available: Boolean
  }

  extend type Query {
    getSpots: [Spot]!
    getSpot(id: ID): Spot!
  }

  extend type Mutation {
    createSpot(id: ID, number: String, available: Boolean): Spot
    updateSpot(id: ID, number: String, available: Boolean): Spot
    deleteSpot(id: ID!): Spot
  }
`;
