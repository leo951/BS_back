const { gql } = require("apollo-server-express");

module.exports = gql`
  type Floor {
    id: ID
    letter: String
    spots: [Spot]
  }

  type Query {
    getFloors: [Floor]!
    getFloor(id: ID): Floor!
  }

  type Mutation {
    createFloor(id: ID, letter: String, spots: [ID]): Floor
    updateFloor(id: ID, letter: String, spots: [ID]): Floor
    deleteFloor(id: ID!): Floor
  }
`;
